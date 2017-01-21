import { MagicAppPage } from './app.po';

describe('magic-app App', function() {
  let page: MagicAppPage;

  beforeEach(() => {
    page = new MagicAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
