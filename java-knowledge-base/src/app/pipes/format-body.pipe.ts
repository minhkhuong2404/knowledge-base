import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatBody' })
export class FormatBodyPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    let html = this.escapeHtml(value);
    html = this.convertBacktickCode(html);
    html = this.convertBold(html);
    html = this.convertItalic(html);
    html = this.convertNumberedLists(html);
    html = this.highlightEmphasis(html);
    html = this.convertNewlines(html);

    return html;
  }

  private escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  private convertBacktickCode(text: string): string {
    return text.replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  private convertNumberedLists(text: string): string {
    const markerRegex = /(\d+)\)\s/g;
    const allMatches = [...text.matchAll(markerRegex)];

    if (allMatches.length < 2) return text;

    const groups = this.findConsecutiveGroups(allMatches);
    if (groups.length === 0) return text;

    let result = '';
    let cursor = 0;

    for (let g = 0; g < groups.length; g++) {
      const group = groups[g];
      const groupStart = group[0].index!;
      const nextBoundary = g + 1 < groups.length ? groups[g + 1][0].index! : text.length;

      let intro = text.substring(cursor, groupStart).trimEnd();
      intro = intro.replace(/[:—–\-]\s*$/, '').trimEnd();
      if (intro) result += intro;

      const items: string[] = [];
      for (let i = 0; i < group.length; i++) {
        const itemStart = group[i].index! + group[i][0].length;
        const itemEnd = i + 1 < group.length ? group[i + 1].index! : nextBoundary;
        let item = text.substring(itemStart, itemEnd).trim();
        item = item.replace(/\.\s*$/, '');
        items.push(item);
      }

      const trailing = this.extractTrailingText(items);

      result += '<ul class="body-list">';
      for (const item of items) {
        result += `<li>${this.formatListItem(item)}</li>`;
      }
      result += '</ul>';

      if (trailing) result += trailing;
      cursor = nextBoundary;
    }

    if (cursor < text.length) {
      result += text.substring(cursor);
    }

    return result;
  }

  private findConsecutiveGroups(matches: RegExpMatchArray[]): RegExpMatchArray[][] {
    const groups: RegExpMatchArray[][] = [];
    let current: RegExpMatchArray[] = [matches[0]];

    for (let i = 1; i < matches.length; i++) {
      const prevNum = parseInt(matches[i - 1][1]);
      const currNum = parseInt(matches[i][1]);

      if (currNum === prevNum + 1) {
        current.push(matches[i]);
      } else {
        if (current.length >= 2 && parseInt(current[0][1]) === 1) {
          groups.push(current);
        }
        current = [matches[i]];
      }
    }

    if (current.length >= 2 && parseInt(current[0][1]) === 1) {
      groups.push(current);
    }

    return groups;
  }

  private extractTrailingText(items: string[]): string {
    if (items.length === 0) return '';

    const lastItem = items[items.length - 1];
    const sentenceBreak = lastItem.match(/\.\s+([A-Z][^.]*(?:\([^)]*\)[^.]*)*\.?\s*.*$)/);

    if (sentenceBreak && sentenceBreak.index !== undefined) {
      const breakPoint = sentenceBreak.index + 1;
      const trailing = lastItem.substring(breakPoint).trim();

      if (trailing.length > 15) {
        items[items.length - 1] = lastItem
          .substring(0, breakPoint)
          .trim()
          .replace(/\.\s*$/, '');
        return ' ' + trailing;
      }
    }

    return '';
  }

  private formatListItem(item: string): string {
    const dashPattern = item.match(/^(.+?)\s*[—–]\s+(.*)/s);
    if (dashPattern && dashPattern[1].length < 80) {
      return `<strong>${dashPattern[1].trim()}</strong> — ${dashPattern[2].trim()}`;
    }

    const colonPattern = item.match(/^([^:]+?):\s+(.*)/s);
    if (
      colonPattern &&
      colonPattern[1].length < 60 &&
      !colonPattern[1].includes(',') &&
      !colonPattern[1].includes('(')
    ) {
      return `<strong>${colonPattern[1].trim()}</strong>: ${colonPattern[2].trim()}`;
    }

    return item;
  }

  private convertBold(text: string): string {
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  private convertItalic(text: string): string {
    return text.replace(/\*([^*]+?)\*/g, '<em>$1</em>');
  }

  private convertNewlines(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  private highlightEmphasis(text: string): string {
    const emphasisWords = [
      'NOT',
      'MUST',
      'ALWAYS',
      'NEVER',
      'BEFORE',
      'AFTER',
      'CRITICAL',
      'IMPORTANT',
      'NOTE',
      'WARNING',
      'ONLY',
      'CANNOT',
      'FORCED',
    ];

    const techAcronyms = new Set([
      'JVM',
      'JDK',
      'JRE',
      'GC',
      'API',
      'SQL',
      'IO',
      'JIT',
      'AQS',
      'CAS',
      'OOP',
      'SPI',
      'JDBC',
      'JMM',
      'CLH',
      'FIFO',
      'LIFO',
      'CPU',
      'NIO',
      'OOM',
      'NPE',
      'DI',
      'AOP',
      'PECS',
      'SOLID',
      'SRP',
      'OCP',
      'LSP',
      'ISP',
      'DIP',
      'JNI',
      'OS',
      'UTC',
      'IEEE',
      'JPMS',
      'HTTP',
      'JSON',
      'XML',
      'URI',
      'URL',
      'ASCII',
      'UTF',
      'CGLIB',
      'ASM',
      'STW',
      'JFR',
      'JMC',
      'MAT',
      'CVE',
      'RPC',
      'HTML',
      'CSS',
      'GUI',
      'CLI',
      'AOT',
      'REPL',
      'LTS',
      'TCCL',
      'OK',
      'OR',
      'AND',
      'HB',
      'CDS',
      'GET',
      'PUT',
      'POST',
      'DELETE',
      'ID',
      'TTL',
      'DO',
    ]);

    const pattern = new RegExp(`\\b(${emphasisWords.join('|')})\\b`, 'g');

    return text.replace(pattern, (match) => {
      if (techAcronyms.has(match)) return match;
      return `<strong class="emphasis">${match}</strong>`;
    });
  }
}
