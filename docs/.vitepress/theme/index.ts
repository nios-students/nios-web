// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import { useRoute } from 'vitepress';
import { onMounted, defineComponent } from 'vue';




export default defineComponent({
  ...DefaultTheme,
  setup() {
    const route = useRoute();
    onMounted(() => {
      // Only run in the browser environment
      if (typeof window !== 'undefined') {
        // Check if the pop-up has already been dismissed
        if (!localStorage.getItem('faqPopupDismissed')) {
          // Create and show the pop-up on first visit
          (function showPopup() {
            // Create the pop-up container
            const popup: HTMLDivElement = document.createElement('div');
            Object.assign(popup.style, {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              zIndex: '1000'
            });

            // Create the content container
            const content: HTMLDivElement = document.createElement('div');
            Object.assign(content.style, {
              backgroundColor: '#222831',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '500px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              marginTop: '20px'
            });

            // Create the heading
            const h1: HTMLHeadingElement = document.createElement('h1');
            h1.textContent = 'Welcome to wiki';
            content.appendChild(h1);

            // Create the paragraph with a clickable link
            const p: HTMLParagraphElement = document.createElement('p');
            p.innerHTML = `If you have discovered this page from elsewhere, we warmly invite you to explore our community at <a href="https://www.reddit.com/r/Nios_unofficial/" target="_blank">r/Nios_unofficial</a>.`;
            // Select the <a> tag inside the <p> element
            const link: HTMLAnchorElement | null = p.querySelector('a');
            if (link) {
              Object.assign(link.style, {
                color: 'blue',
                textDecoration: 'underline'
              });
            }
            content.appendChild(p);

            // Create the buttons container
            const buttons: HTMLDivElement = document.createElement('div');
            Object.assign(buttons.style, {
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '10px'
            });

            // Create the "Open Community" button
            const openButton: HTMLButtonElement = document.createElement('button');
            openButton.textContent = 'Community';
            openButton.className = 'popup-button-open';
            openButton.onclick = function () {
              localStorage.setItem('faqPopupDismissed', 'true');
              document.body.removeChild(popup);
              window.open('https://nios-students.pages.dev/links/', '_blank');
            };
            Object.assign(openButton.style, {
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              // backgoundColor: 'blue'
              backgroundColor: '#28a745',
            });
            buttons.appendChild(openButton);

            // Create the "Close" button
            const closeButton: HTMLButtonElement = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.className = 'popup-button-close';
            closeButton.onclick = function () {
              localStorage.setItem('faqPopupDismissed', 'true');
              document.body.removeChild(popup);
            };
            Object.assign(closeButton.style, {
              backgroundColor: 'red',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            });
            buttons.appendChild(closeButton);

            // Append buttons to content, content to popup, and popup to body
            content.appendChild(buttons);
            popup.appendChild(content);
            document.body.appendChild(popup);
          })();
        }
      }
    });
  }
});
