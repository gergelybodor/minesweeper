import { ProjectPortalPage } from './app.po';

describe('project-portal App', () => {
  let page: ProjectPortalPage;

  beforeEach(() => {
    page = new ProjectPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
