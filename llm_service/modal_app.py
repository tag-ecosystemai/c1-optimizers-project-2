import modal

app = modal.App("rawsignal-summarizer")

image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install("llama-cpp-python", "huggingface_hub", "fastapi[standard]")
    .run_commands(
        "python -c \"from huggingface_hub import hf_hub_download; "
        "hf_hub_download(repo_id='Qwen/Qwen2.5-0.5B-Instruct-GGUF', "
        "filename='qwen2.5-0.5b-instruct-q4_k_m.gguf')\""
    )
)


def get_target_length(text: str) -> str:
    word_count = len(text.split())
    if word_count < 300:
        return "2-3 sentences (one short paragraph)"
    elif word_count < 800:
        return "1-2 paragraphs"
    else:
        return "2-3 paragraphs"


@app.cls(image=image, cpu=2.0, timeout=180, scaledown_window=120)
class Summarizer:
    @modal.enter()
    def load_model(self):
        from huggingface_hub import hf_hub_download
        from llama_cpp import Llama

        model_path = hf_hub_download(
            repo_id="Qwen/Qwen2.5-0.5B-Instruct-GGUF",
            filename="qwen2.5-0.5b-instruct-q4_k_m.gguf"
        )
        self.llm = Llama(model_path=model_path, n_ctx=4096, n_threads=2, verbose=False)

    @modal.fastapi_endpoint(method="POST")
    def summarize(self, item: dict):
        article_text = item.get("article_text", "")
        if not article_text.strip():
            return {"error": "No article text provided."}

        target_length = get_target_length(article_text)
        system_prompt = (
            f"You are a neutral news summarizer. Summarize the article in {target_length}, "
            "focusing on the key facts. Do not add opinions, editorializing, or loaded language. "
            "Do not add information not present in the article."
        )

        response = self.llm.create_chat_completion(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Article:\n{article_text[:6000]}"}
            ],
            max_tokens=500,
            temperature=0.3,
            repeat_penalty=1.3,
            frequency_penalty=0.3
        )
        return {"summary": response["choices"][0]["message"]["content"].strip()}