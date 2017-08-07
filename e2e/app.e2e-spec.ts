import { GhAngularAuthPage } from './app.po';

describe('gh-angular-auth App', () => {
  let page: GhAngularAuthPage;

  beforeEach(() => {
    page = new GhAngularAuthPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
