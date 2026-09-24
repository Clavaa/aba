/**
 * IndexNow key. Public by design — it proves we control this host, nothing
 * more, and the same value must be readable at /${INDEXNOW_KEY}.txt.
 *
 * IndexNow pushes URLs to Bing, Yandex, Seznam and Naver the moment they
 * change, and DuckDuckGo takes Bing's index. Google does not participate, so
 * this widens reach beyond Google rather than inside it — which is exactly
 * why it is worth having while Google's crawl of 13,400 pages is the
 * bottleneck.
 */
export const INDEXNOW_KEY = "3e1dcd409ed53851cb50dc2866147d810d1ff9b2dcf75c44";
export const INDEXNOW_KEY_FILE = `/${INDEXNOW_KEY}.txt`;
