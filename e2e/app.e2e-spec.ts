import { StockExamplePage } from './app.po';

describe('stock-example App', function() {
  let page: StockExamplePage;

  beforeEach(() => {
    page = new StockExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
