import assert from 'node:assert/strict';
import test from 'node:test';
import { stagingArticleAuthor } from '../lib/babylovegrowth/authorship.ts';
import { stagingArticleMetadata } from '../lib/babylovegrowth/presentation.ts';

for (const article of [
  { id: 1089880, slug: 'adjustment-disorder-therapy', title: 'Adjustment Disorder Therapy', meta_description: 'Original' },
  { id: 1096084, slug: 'how-much-does-therapy-cost-in-texas', title: 'Therapy Costs', meta_description: 'Original' },
]) {
  test(`${article.slug}: approved author and reviewed metadata`, () => {
    assert.deepEqual(stagingArticleAuthor(article), { name: 'Jennifer Wood LPC-S', profilePath: '/therapists/jennifer-wood/' });
    const metadata = stagingArticleMetadata(article);
    assert.ok(metadata.title.length < 65);
    assert.ok(metadata.description.length >= 120 && metadata.description.length <= 165);
    assert.match(metadata.description, /Tyler, TX/);
    assert.equal(stagingArticleAuthor({ ...article, slug: 'unreviewed-article' }), undefined);
    assert.equal(stagingArticleMetadata({ ...article, id: 0 }).description, 'Original');
  });
}
