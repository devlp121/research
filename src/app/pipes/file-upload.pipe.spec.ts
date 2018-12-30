import { FileUploadPipe } from './file-upload.pipe';

describe('FileUploadPipe', () => {
  it('create an instance', () => {
    const pipe = new FileUploadPipe();
    expect(pipe).toBeTruthy();
  });
});
