import trafilatura

url = "https://www.bbc.com/news/articles/cmpq0wj5g899o"

downloaded = trafilatura.fetch_url(url)
text = trafilatura.extract(downloaded)

print("Length:", len(text) if text else 0)
print("---")
print(text)