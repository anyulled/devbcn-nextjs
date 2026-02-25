
import time
import requests
from playwright.sync_api import sync_playwright, expect

def wait_for_server(url, timeout=120):
    start_time = time.time()
    print(f"Waiting for {url} to be responsive...")
    while time.time() - start_time < timeout:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print("Server is ready!")
                return True
        except requests.exceptions.ConnectionError:
            pass
        except Exception as e:
            print(f"Error checking server: {e}")
        time.sleep(1)
    print("Server failed to start within timeout.")
    return False

def verify_section5():
    url = "http://localhost:3000/2026"
    if not wait_for_server(url):
        return

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print(f"Navigating to {url}")
        page.goto(url)

        # Wait for the section to be visible
        print("Waiting for 'Meet Our Speakers' section...")
        # Scroll down to ensure images load
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        # Locate the section header
        header = page.get_by_text("Meet Our Speakers").first
        header.scroll_into_view_if_needed()
        expect(header).to_be_visible()

        print("Found section header. Checking background image...")

        # Locate the background image by src
        # Since it's optimized, src will contain `_next/image` and `url` param containing the original path
        # Use partial match on src attribute
        bg_image = page.locator('img[src*="header-bg20.png"]')

        # Check if the image is visible
        if bg_image.count() > 0:
            print("Background image found!")
            expect(bg_image.first).to_be_visible()

            # Take screenshot of the section
            # Find the section container
            section = page.locator(".team8-section-rea").first
            section.screenshot(path="verification_section5.png")
            print("Screenshot saved to verification_section5.png")
        else:
            print("Background image NOT found!")
            # Take screenshot of the whole page for debugging
            page.screenshot(path="verification_failure.png")

        browser.close()

if __name__ == "__main__":
    verify_section5()
