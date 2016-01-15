'use strict';

class Menu {
  constructor(options) {
    this._el = options.element;

    this._title = this._el.querySelector('.menu_title');

    this._title.onclick = this._onTitleClick.bind(this);
  }

  _onTitleClick() {
    console.log(this);
    this._el.classList.toggle('open');
  }

  filter(value) {
    console.log(`Menu was filtered with "${value}"`);
  }
}

class Filter {
  constructor(options) {
    this._el = options.element;

    this._field = this._el.querySelector('.filter_field');

    this._field.addEventListener('input', this._onFieldInput.bind(this));
  }

  getElement() {
    return this._el;
  }

  _onFieldInput(event) {
    var customEvent = new CustomEvent('filterValueChanged', {
      detail: {
        value: this._field.value
      }
    });

    console.log('Filter value has changed to ' + this._field.value);

    this._el.dispatchEvent(customEvent);
  }
}

class Navigation {
  constructor(options) {
    this._el = options.element;

    this._filter = new Filter({
      element: this._el.querySelector('.filter')
    });

    this._menu = new Menu({
      element: this._el.querySelector('.menu')
    });

    this._filter.getElement().addEventListener('filterValueChanged', this._onFilterValueChanged.bind(this))
  }

  _onFilterValueChanged(event) {
    console.log('Current filter value is ' + event.detail.value);
  }
}