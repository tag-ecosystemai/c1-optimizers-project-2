from collections import defaultdict

from ..schemas import Entity, EntityComparison, EntityComparisonItem


def compare_entities(entities_per_article: list[list[Entity]]) -> EntityComparison:
    """Groups entities by (normalized text, label) across articles and splits
    them into ones every article mentions ("shared") vs. ones only some do
    ("divergent"). `entities_per_article[i]` must line up with the i-th
    article in the caller's articles list.
    """
    mentions: dict[tuple[str, str], set[int]] = defaultdict(set)
    display_text: dict[tuple[str, str], str] = {}

    for idx, entities in enumerate(entities_per_article):
        for entity in entities:
            key = (entity.text.strip().lower(), entity.label)
            mentions[key].add(idx)
            display_text.setdefault(key, entity.text.strip())

    num_articles = len(entities_per_article)
    shared: list[EntityComparisonItem] = []
    divergent: list[EntityComparisonItem] = []

    for key, indices in mentions.items():
        _, label = key
        item = EntityComparisonItem(
            text=display_text[key],
            label=label,
            article_indices=sorted(indices),
            mentioned_in_count=len(indices),
        )
        if num_articles > 1 and len(indices) == num_articles:
            shared.append(item)
        else:
            divergent.append(item)

    shared.sort(key=lambda item: item.text)
    divergent.sort(key=lambda item: (-item.mentioned_in_count, item.text))

    return EntityComparison(shared=shared, divergent=divergent)
