import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  Input,
  output,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import '@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css';
import * as UC from '@uploadcare/file-uploader';
import { OutputFileEntry } from '@uploadcare/file-uploader';

UC.defineComponents(UC);

@Component({
  selector: 'uploader-regular-view',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './uploader-regular-view.component.html',
  styleUrl: './uploader-regular-view.component.scss',
})
export class UploaderRegularViewComponent {
  @ViewChild('ctxProvider', { static: true }) ctxProviderRef!: ElementRef<
    InstanceType<UC.UploadCtxProvider>
  >;

  fileUploaded = output<string>();
  fileRemoved = output<void>();

  files = signal<OutputFileEntry<'success'>[]>([]);

  ngOnInit() {
    this.ctxProviderRef.nativeElement.addEventListener(
      'change',
      this.handleChangeEvent
    );

    this.ctxProviderRef.nativeElement.addEventListener(
      'file-upload-success',
      this.handleDoneFlow
    );

    this.ctxProviderRef.nativeElement.addEventListener(
      'file-removed',
      this.handleFileRemoved
    );
  }

  ngOnDestroy() {
    this.ctxProviderRef.nativeElement.removeEventListener(
      'change',
      this.handleChangeEvent
    );
  }

  handleChangeEvent = (e: UC.EventMap['change']) => {
    const files = e.detail.allEntries.filter(
      (f) => f.status === 'success'
    ) as OutputFileEntry<'success'>[];

    this.files.set(files);
  };

  handleDoneFlow = (e: UC.EventMap['file-upload-success']) => {
    console.log('done', e.detail.cdnUrl);
    this.fileUploaded.emit(e.detail.cdnUrl);
  };

  handleFileRemoved = (e: UC.EventMap['file-removed']) => {
    console.log('removed', e);
    this.fileRemoved.emit();
  };

  formatSize = (bytes: number | null) => {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };
}
