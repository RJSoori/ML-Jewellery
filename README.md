# ML Jewellery prototype

A clickable front-end prototype for **ML Jewellery**, a small handmade jewellery business. It is built from the IS 3610 wireframes (W1 to W13) and shows how customers, the owner and an assistant would move through the system.

It is a prototype, not a finished system. There is no server or database: sample data is saved in your own browser, so you can click through every flow and your changes carry from page to page.

## What you can try

**As a customer**
- Browse the collection and open a product to see its photos, craft story and care guide.
- Request a custom piece (or "Request a similar piece" from a product). You get an order number.
- Track an order with its number and phone number. The page opens on a sample order and has buttons for orders at every stage.

**As the owner** (footer link "Staff sign in", then Owner)
- Dashboard with open orders, orders due soon and low-stock alerts.
- Orders: filter, open an order, change its stage or due date, assign it to the assistant.
- Inventory and suppliers: record a purchase, set minimum stock levels, choose a substitute for a scarce material.
- Costing: work out a cost and suggested price, then use it as the shop price.
- Design library and product pages, including an "AI draft" of the craft story that must be approved before it is published.
- Monthly report.

**As the assistant** (Staff sign in, then Assistant)
- See assigned designs with their steps, and mark one as done. Prices and reports are hidden.

Changes show up across the roles. For example, if the owner moves an order to "Finishing", the customer's tracking page shows it.

## Set it up on your computer

You need a modern browser. Chrome or Edge work best. An internet connection is only needed for the fonts.

### 1. Get the files

Either clone the repository:

```bash
git clone https://github.com/RJSoori/ML-Jewellery.git
cd ML-Jewellery
```

or on GitHub choose **Code > Download ZIP** and unzip it.

### 2. Open it

**Quickest:** double-click `index.html` to open it in Chrome or Edge.

**Recommended (works in every browser, including Firefox and Safari):** run a small local web server from the project folder, then open the address it gives you.

With Python installed:

```bash
python -m http.server 8000
```

Then go to <http://localhost:8000>.

Or, with Node.js installed:

```bash
npx serve .
```

Or, in VS Code, install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.

### 3. Start over at any time

The prototype saves its sample data in your browser. To put the original samples back, go to **Staff sign in** and choose **Reset demo data** (also in the owner sidebar).

## Sample details

| Use | Value |
| --- | --- |
| Order to track | `ML-0123` with phone `0771234567` |
| Other sample orders | `ML-0118` to `ML-0128` (buttons on the tracking page fill these in) |
| "Today" in the prototype | 15 Nov 2026, fixed so due dates and "days late" stay the same |

## Project files

| File | Wireframe |
| --- | --- |
| `index.html` | W1 Home and catalogue |
| `product.html` | W2 Product page |
| `request.html` | W3 Custom request form |
| `track.html` | W4 Order tracking |
| `owner-dashboard.html` | W5 Owner dashboard |
| `owner-orders.html` | W6 Orders |
| `owner-inventory.html` | W7 Inventory and purchases |
| `owner-suppliers.html` | W8 Suppliers and substitutes |
| `owner-costing.html` | W9 Costing and price suggestion |
| `owner-designs.html` | W10 Design library |
| `owner-pages.html` | W11 Product page editor with AI draft |
| `owner-reports.html` | W12 Reports |
| `assistant.html` | W13 Assistant view |
| `about.html`, `staff.html` | About page and role choice (no wireframe) |
| `css/styles.css` | All styling |
| `js/core.js` | Sample data, saving, and shared page parts |
| `images/` | Product and workshop photos |

## What is simulated

- **No real accounts:** choosing a role on the staff page signs you in, with no password.
- **AI draft:** the text comes from a fixed template, not a real AI model.
- **Price suggestion:** a simple markup on cost, not real sales history.
- **Tracking updates:** dates and notes are generated from the order's current stage.
- **Uploaded photos:** kept in the browser, up to three per request.

## Photo credits

The photos are free stock images used as stand-ins, not ML Jewellery's own pieces. Most are from [Burst by Shopify](https://www.shopify.com/stock-photos). The wire wrap ring photos are "Peruvian opal wire wrapped ring with brass band" by [Zawezome on Flickr](https://www.flickr.com/photos/8699239@N04/4134119626), used under [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
