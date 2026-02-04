from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to home
        page.goto("http://localhost:3000/")

        # Wait for redirect
        page.wait_for_url("**/2026")

        # Wait for content to load
        page.wait_for_selector(".hero8-slider-area")

        # Wait for animations/stability
        page.wait_for_timeout(3000)

        # Screenshot Hero Section (Section1)
        try:
            page.locator(".hero8-slider-area").screenshot(path="/home/jules/verification/section1.png")
            print("Screenshot of Section 1 saved.")
        except Exception as e:
            print(f"Failed to screenshot section 1: {e}")
            page.screenshot(path="/home/jules/verification/full_page_fail_1.png")

        # Scroll down to About Section (Section2)
        page.evaluate("window.scrollTo(0, 1000)")
        page.wait_for_timeout(1000)

        # Screenshot About Section (Section2)
        try:
            page.locator(".about8-section-area").screenshot(path="/home/jules/verification/section2.png")
            print("Screenshot of Section 2 saved.")
        except Exception as e:
            print(f"Failed to screenshot section 2: {e}")
             # fallback
            page.screenshot(path="/home/jules/verification/full_page_fail_2.png")

        browser.close()

if __name__ == "__main__":
    run()
