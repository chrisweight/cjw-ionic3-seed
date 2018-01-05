import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';


export type ResponsiveImageSizing = 'cover' | 'contain';


@Component({
  selector: 'responsive-image',
  templateUrl: 'responsive-image.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveImageComponent {

  imageStyle: SafeStyle;
  sizingStyle: SafeStyle;

  @Input()
  set src(value: string) {
    if (!this.isValidString(value)) {
      return;
    }

    this.imageStyle = this._sanitizer.bypassSecurityTrustStyle(
      `url('${value}')`
    );
  }

  @Input()
  set sizing(value: ResponsiveImageSizing) {
    this.sizingStyle = this._sanitizer.bypassSecurityTrustStyle(
      `${value}`
    );
  }

  constructor(private _sanitizer: DomSanitizer) {

  }

  private isValidString(value: string): boolean {
    return (value !== null && typeof value !== 'undefined' && (/\S/.test(value)));
  }
}
