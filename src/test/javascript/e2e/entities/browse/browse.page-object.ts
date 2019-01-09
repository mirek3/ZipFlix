import { element, by, ElementFinder } from 'protractor';

export class BrowseComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-browse div table .btn-danger'));
    title = element.all(by.css('jhi-browse div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BrowseUpdatePage {
    pageTitle = element(by.id('jhi-browse-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    videoIdInput = element(by.id('field_videoId'));
    thumbnailInput = element(by.id('field_thumbnail'));
    categoryInput = element(by.id('field_category'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setVideoIdInput(videoId) {
        await this.videoIdInput.sendKeys(videoId);
    }

    async getVideoIdInput() {
        return this.videoIdInput.getAttribute('value');
    }

    async setThumbnailInput(thumbnail) {
        await this.thumbnailInput.sendKeys(thumbnail);
    }

    async getThumbnailInput() {
        return this.thumbnailInput.getAttribute('value');
    }

    async setCategoryInput(category) {
        await this.categoryInput.sendKeys(category);
    }

    async getCategoryInput() {
        return this.categoryInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class BrowseDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-browse-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-browse'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
