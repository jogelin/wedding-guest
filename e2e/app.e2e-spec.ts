import { WeddingGuestPage } from './app.po';

describe('wedding-guest App', function() {
  let page: WeddingGuestPage;

  beforeEach(() => {
    page = new WeddingGuestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
