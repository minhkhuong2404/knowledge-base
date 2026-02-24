import { Component, ChangeDetectionStrategy, input, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import sql from 'highlight.js/lib/languages/sql';
import yaml from 'highlight.js/lib/languages/yaml';
import properties from 'highlight.js/lib/languages/properties';

hljs.registerLanguage('java', java);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('properties', properties);

@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
  template: `
    <div class="code-block">
      @if (title()) {
        <div class="code-header">
          <span class="code-title">{{ title() }}</span>
          <div class="code-actions">
            <span class="code-lang">{{ language() }}</span>
            <button mat-stroked-button class="copy-btn" (click)="copyCode()" [class.copied]="copied()">
              <i [class]="copied() ? 'fa-solid fa-check' : 'fa-regular fa-copy'"></i>
              {{ copied() ? 'Copied' : 'Copy' }}
            </button>
          </div>
        </div>
      }
      <pre><code [innerHTML]="highlightedCode()"></code></pre>
    </div>
  `,
  styles: `
    .code-block {
      margin-bottom: 1.5rem;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.6rem 1rem;
      background: #f8f9fa;
      border-bottom: 1px solid #e5e7eb;
    }

    .code-title {
      font-size: 0.82rem;
      font-weight: 600;
      color: #374151;
    }

    .code-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .code-lang {
      font-size: 0.72rem;
      font-weight: 600;
      color: #E76F00;
      background: rgba(231, 111, 0, 0.08);
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      text-transform: uppercase;
    }

    .copy-btn {
      --mdc-outlined-button-label-text-size: 0.72rem;
      height: 28px;
      padding: 0 0.5rem;

      i {
        font-size: 12px;
        margin-right: 0.25rem;
      }

      &.copied {
        --mdc-outlined-button-label-text-color: #059669;
        --mdc-outlined-button-outline-color: #059669;
      }
    }

    pre {
      margin: 0;
      padding: 1.25rem;
      background: #1e1e2e;
      overflow-x: auto;

      &::-webkit-scrollbar {
        height: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #313244;
      }

      &::-webkit-scrollbar-thumb {
        background: #585b70;
        border-radius: 3px;
      }
    }

    code {
      font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
      font-size: 0.82rem;
      line-height: 1.65;
      color: #cdd6f4;
      white-space: pre;
    }

    /* ── Catppuccin Mocha inspired syntax theme ── */
    :host ::ng-deep {
      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-built_in,
      .hljs-type { color: #cba6f7; }

      .hljs-string,
      .hljs-template-variable { color: #a6e3a1; }

      .hljs-comment,
      .hljs-doctag { color: #6c7086; font-style: italic; }

      .hljs-number,
      .hljs-literal { color: #fab387; }

      .hljs-title,
      .hljs-section,
      .hljs-title.function_ { color: #89b4fa; }

      .hljs-class .hljs-title,
      .hljs-title.class_ { color: #f9e2af; }

      .hljs-attr,
      .hljs-attribute { color: #f9e2af; }

      .hljs-variable,
      .hljs-template-variable { color: #f38ba8; }

      .hljs-symbol,
      .hljs-bullet { color: #f2cdcd; }

      .hljs-meta { color: #f5c2e7; }

      .hljs-meta .hljs-keyword { color: #fab387; }

      .hljs-link { color: #89b4fa; text-decoration: underline; }

      .hljs-deletion { color: #f38ba8; }
      .hljs-addition { color: #a6e3a1; }

      .hljs-params { color: #cdd6f4; }

      .hljs-property { color: #89dceb; }

      .hljs-tag { color: #cba6f7; }
      .hljs-name { color: #cba6f7; }
    }
  `,
})
export class CodeBlock {
  code = input.required<string>();
  language = input('java');
  title = input('');

  copied = signal(false);

  highlightedCode = computed(() => {
    const lang = this.language();
    const raw = this.code();
    try {
      if (hljs.getLanguage(lang)) {
        return hljs.highlight(raw, { language: lang }).value;
      }
      return hljs.highlightAuto(raw).value;
    } catch {
      return this.escapeHtml(raw);
    }
  });

  copyCode(): void {
    navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
