import { DirectiveBinding } from 'vue';

export const tokens = {
  '#': { pattern: /\d/ },
  x: { pattern: /[0-9a-zA-Z]/ },
  S: { pattern: /[a-zA-Z]/ },
  A: { pattern: /[a-zA-Z]/, transform: (v: any) => v.toLocaleUpperCase() },
  a: { pattern: /[a-zA-Z]/, transform: (v: any) => v.toLocaleLowerCase() },
  X: { pattern: /[0-9a-zA-Z]/, transform: (v: any) => v.toLocaleUpperCase() },
  '!': { escape: true }
};

export function mask(el: any, binding: DirectiveBinding<any>) {
  let config = binding.value;
  if (!config) return;
  if (Array.isArray(config) || typeof config === 'string') {
    config = {
      mask: config,
      tokens: tokens
    };
  }
  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    const els = el.getElementsByTagName('input');
    if (els.length !== 1) {
      throw new Error('v-mask directive requires 1 input, found ' + els.length);
    } else {
      el = els[0];
    }
  }

  el.oninput = (evt: any) => {
    if (!evt.isTrusted) return; // avoid infinite loop
    // by default, keep cursor at same position as before the mask
    let position = el.selectionEnd;
    // save the character just inserted
    const digit = el.value[position - 1];
    el.value = masker(el.value, config.mask, true, config.tokens).toLocaleUpperCase();

    // if the digit was changed, increment position until find the digit again
    while (position < el.value.length && el.value.charAt(position - 1) !== digit) {
      position++;
    }
    if (el === document.activeElement) {
      el.setSelectionRange(position, position);
      setTimeout(function () {
        el.setSelectionRange(position, position);
      }, 0);
    }
    el.dispatchEvent(new CustomEvent('input'));
  };

  const newDisplay = masker(el.value, config.mask, true, config.tokens);
  if (newDisplay !== el.value) {
    el.value = newDisplay;
    el.dispatchEvent(new CustomEvent('input'));
  }
}

function masker(value: string, mask: string, masked = true, tokens: any) {
  return Array.isArray(mask)
    ? dynamicMask(maskit, mask, tokens)(value, mask, masked)
    : maskit(value, mask, masked, tokens);
}

function dynamicMask(maskit: any, masks: string[], tokens: any) {
  masks = masks.sort((a, b) => a.length - b.length);
  return function (value: string, _mask: any, masked = true) {
    let i = 0;
    while (i < masks.length) {
      const currentMask = masks[i];
      i++;
      const nextMask = masks[i];
      if (!(nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length)) {
        return maskit(value, currentMask, masked, tokens);
      }
    }
    return ''; // empty masks
  };
}

function maskit(value: string, mask: string, masked = true, tokens: any) {
  value = value || '';
  mask = mask || '';
  let iMask = 0;
  let iValue = 0;
  let output = '';
  while (iMask < mask.length && iValue < value.length) {
    let cMask = mask[iMask];
    const _masker = tokens[cMask];
    const cValue = value[iValue];
    if (_masker && !_masker.escape) {
      if (_masker.pattern.test(cValue)) {
        output += _masker.transform ? _masker.transform(cValue) : cValue;
        iMask++;
      }
      iValue++;
    } else {
      if (_masker && _masker.escape) {
        iMask++; // take the next mask char and treat it as char
        cMask = mask[iMask];
      }
      if (masked) output += cMask;
      if (cValue === cMask) iValue++; // user typed the same char
      iMask++;
    }
  }

  // fix mask that ends with a char: (#)
  let restOutput = '';
  while (iMask < mask.length && masked) {
    const cMask = mask[iMask];
    if (tokens[cMask]) {
      restOutput = '';
      break;
    }
    restOutput += cMask;
    iMask++;
  }

  return output + restOutput;
}
