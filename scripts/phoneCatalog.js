'use strict';

class PhoneCatalog {
  constructor(options) {
    this._el = options.element;

    this._template = `
      <span class="number-of-phones">We have <%- phones.length %> phones</span>
      <ul class="phone-catalog__list">
        <% phones.forEach(function(phone) { %>
          <li><%- phone.age %><a href="#<%- phone.id %>"><%- phone.name %></a></li>
        <% }); %>
      </ul>
    `;

    this._compiledTemplate = _.template(this._template);

    this._el.innerHTML = this._compiledTemplate({
      phones: options.phones
    });
  }
}
