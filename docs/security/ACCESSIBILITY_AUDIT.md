# Accessibility Code-Level Review (WCAG 2.1 Level AA Criteria)

## 1. Executive Summary & Review Scope
This review evaluates the accessibility posture of the Jain Mandir / Jambudweep platform based on **Static Source Code Inspection** against the **W3C Web Content Accessibility Guidelines (WCAG 2.1 Level AA)**.

> [!NOTE]
> Automated browser accessibility scanning (Axe-core, Pa11y, Lighthouse Accessibility) and certified manual assistive technology testing (JAWS, NVDA, VoiceOver) were **NOT TESTED** in this local CLI environment due to the absence of browser testing tools. The findings below represent code-level compliance reviews.

---

## 2. WCAG 2.1 Level AA Code-Level Review Matrix

| Criterion | Level | Code Inspection Findings | Live Tooling Status |
| :--- | :--- | :--- | :--- |
| **1.1.1 Non-text Content** | A | Meaningful image tags feature descriptive `alt` attributes (`alt="Jambudweep Main Entrance"`, etc.). Decorative icons use SVGs without misleading text. | **CODE VERIFIED (Live: NOT TESTED)** |
| **1.3.1 Info & Relationships** | A | Semantic HTML5 elements (`header`, `main`, `footer`, `nav`, `section`) structure the layout in `Layout.jsx` and views. Heading order follows `h1` -> `h2` -> `h3`. | **CODE VERIFIED (Live: NOT TESTED)** |
| **1.4.1 Use of Color** | A | Status cues (active tabs, error banners) combine color with text labels and iconography (`CheckCircle`, warning icons). | **CODE VERIFIED (Live: NOT TESTED)** |
| **1.4.3 Contrast (Minimum)** | AA | Code inspection of Tailwind color tokens indicates high contrast (white/orange against `#111111` in admin panel, `#1a1a1a` on white/surface in public pages). | **CODE VERIFIED (Live: NOT TESTED)** |
| **2.1.1 Keyboard Accessible** | A | Links, buttons, and form controls are natively focusable. Lightbox component in `GalleryPage.jsx` explicitly binds `Escape`, `ArrowLeft`, and `ArrowRight` keyboard listeners. | **CODE VERIFIED (Live: NOT TESTED)** |
| **2.4.2 Page Titled** | A | Descriptive page title configured in `index.html`. | **CODE VERIFIED (Live: NOT TESTED)** |
| **3.3.1 Error Identification** | A | Contact and Login forms present visible textual error banners with `role="alert"` attributes. | **CODE VERIFIED (Live: NOT TESTED)** |
| **3.3.2 Labels or Instructions** | A | `<label>` elements accompany each input control with explicit associations. | **CODE VERIFIED (Live: NOT TESTED)** |

---

## 3. Implemented Code Improvements
1. **Replaced JavaScript `alert()`**: The legacy contact form used browser-blocking `alert()` popups. Replaced with an inline alert banner featuring `role="alert"`:
   ```jsx
   {errorMessage && (
     <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm" role="alert">
       {errorMessage}
     </div>
   )}
   ```
2. **Lightbox ARIA Attributes**: Added explicit `aria-label="Close"`, `aria-label="Previous"`, and `aria-label="Next"` attributes to lightbox modal controls.

---

## 4. Staging QA Recommendations
- Run an automated Axe-core scan via Chrome DevTools Lighthouse on the deployed staging environment.
- Perform a manual screen-reader walkthrough (using macOS VoiceOver or Windows NVDA) covering public navigation and the contact form.
