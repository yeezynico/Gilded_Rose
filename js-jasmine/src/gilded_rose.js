class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (item.name === 'Sulfuras, Hand of Ragnaros') return;

      item.sellIn--;

      switch (item.name) {
        case 'Aged Brie':
          this.updateAgedBrie(item);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.updateBackstagePasses(item);
          break;
        default:
          this.updateNormalItem(item);
          break;
      }

      if (item.sellIn < 0) {
        this.handleExpiredItem(item);
      }
    });

    return this.items;
  }

  updateAgedBrie(item) {
    if (item.quality < 50) item.quality++;
  }

  updateBackstagePasses(item) {
    if (item.quality < 50) item.quality++;
    if (item.sellIn < 10 && item.quality < 50) item.quality++;
    if (item.sellIn < 5 && item.quality < 50) item.quality++;
  }

  updateNormalItem(item) {
    if (item.quality > 0) item.quality--;
    if (item.name.startsWith('Conjured') && item.quality > 0) item.quality--;
  }

  handleExpiredItem(item) {
    if (item.name === 'Aged Brie' && item.quality < 50) {
      item.quality++;
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      item.quality = 0;
    } else if (item.quality > 0) {
      item.quality--;
      if (item.name.startsWith('Conjured') && item.quality > 0) item.quality--;
    }
  }
}
module.exports = {
  Item,
  Shop
}

