const { Shop, Item } = require("../src/gilded_rose");

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

  // This Conjured item does not work properly yet
  new Item("Conjured Mana Cake", 3, 6),
];

const days = Number(process.argv[2]) || 2;
const gildedRose = new Shop(items);

console.log("OMGHAI!");
for (let day = 0; day < days; day++) {
  console.log(`\n-------- day ${day} --------`);
  console.log("name, sellIn, quality");
  items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
  gildedRose.updateQuality();
}
describe("Gilded Rose", function() {
  it("should decrease sellIn and quality daily", function() {
    const gildedRose = new Shop([ new Item("foo", 1, 1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(0);
  });

  it("should degrade quality twice as fast after sellIn date", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("should never have negative quality", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("should increase quality of Aged Brie", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 2, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
  });

  it("should not increase quality above 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 2, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("should not change Sulfuras", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(80);
  });

  it("should increase quality of Backstage passes", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(21);
  });

  it("should drop quality of Backstage passes to 0 after concert", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("should degrade quality of Conjured items twice as fast", function() {
    const gildedRose = new Shop([ new Item("Conjured Mana Cake", 3, 6) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(4);
  });
});


/* LES 9 RÈGLES À TESTER :

1. Diminution quotidienne de sellIn et quality :
Tous les articles voient leur sellIn et quality diminuer chaque jour.

2. Dégradation double après la date de péremption :
Une fois la date de péremption passée (sellIn < 0), la quality se dégrade deux fois plus vite.

3. Qualité non négative :
La quality d'un produit ne peut jamais être négative.

4. Augmentation de la qualité de "Aged Brie" :
"Aged Brie" augmente sa quality plus le temps passe.

5. Qualité maximale de 50 :
La quality d'un produit ne peut jamais dépasser 50.

6. "Sulfuras" ne change jamais :
"Sulfuras" n'a pas de date de péremption et ne perd jamais en quality.

7. Augmentation de la qualité des "Backstage passes" :
"Backstage passes" augmente sa quality plus le temps passe 1.
La quality augmente de 2 quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins.
La quality tombe à 0 après le concert.

8. Dégradation double des articles "Conjured" :
Les articles "Conjured" voient leur quality se dégrader deux fois plus vite que les objets normaux.

9. Qualité de "Sulfuras" fixe à 80 :
La quality de "Sulfuras" est toujours de 80 et ne change jamais.

*/
