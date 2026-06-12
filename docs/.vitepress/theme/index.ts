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
      // why? for fun
      console.log(`

███╗   ██╗██╗ ██████╗ ███████╗                                            
████╗  ██║██║██╔═══██╗██╔════╝                                            
██╔██╗ ██║██║██║   ██║███████╗                                            
██║╚██╗██║██║██║   ██║╚════██║                                            
██║ ╚████║██║╚██████╔╝███████║                                            
╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚══════╝                                            
                                                                          
██╗   ██╗███╗   ██╗ ██████╗ ███████╗███████╗██╗ ██████╗██╗ █████╗ ██╗     
██║   ██║████╗  ██║██╔═══██╗██╔════╝██╔════╝██║██╔════╝██║██╔══██╗██║     
██║   ██║██╔██╗ ██║██║   ██║█████╗  █████╗  ██║██║     ██║███████║██║     
██║   ██║██║╚██╗██║██║   ██║██╔══╝  ██╔══╝  ██║██║     ██║██╔══██║██║     
╚██████╔╝██║ ╚████║╚██████╔╝██║     ██║     ██║╚██████╗██║██║  ██║███████╗
 ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝     ╚═╝ ╚═════╝╚═╝╚═╝  ╚═╝╚══════╝

        `);


      /**
       * Redirects the user from the wiki landing page to the home page with an alert.
       *
       * Purpose:
       * - This logic is used to inform users that the /wiki or /wiki/ route is no longer maintained.
       * - It helps prevent users from accessing outdated or unsupported content.
       * - Users are redirected to the home page, where the latest resources and information are available.
       *
       * How it works:
       * - When the user navigates to /wiki or /wiki/, an alert is shown explaining the redirect.
       * - After the user acknowledges the alert, they are automatically redirected to the home page ('/').
       *
       * Customization:
       * - If you do not want to show the alert before redirecting, simply comment out or remove the alert() line below.
       * - You can also customize the alert message to better fit your site's tone or provide additional instructions.
       * - You can also add additional logic to the alert() 
       * 
       * sugestions(for future maintainers):
       *  if you to make a custon page on /wiki/ you can add a index.md on the docs(https://github.com/nios-students/docs/wiki) and you can add anything you want on that page.like custom redirecting page and all 
       *  ~(VK)
       */
      // *******************************************************************************************************************************

      if (route.path === '/wiki' || route.path === `/wiki/`) {
        alert("This page is no longer maintained.\n\nYou will be redirected to the home page for the latest resources and information.\n\nThank you for your understanding!");
        window.location.href = '/links/';
      }
      // *******************************************************************************************************************************



      // =================================================================== start of new domain popup ============================================================================
      /*
      the code below is for showing popup to user about new domain migration
      it will show only once per user using local storage and will not show again if user has dismissed it by pressing esc key
      this is also a workaround for to pushing magration news to user but its not proper way :) coz i don't know how to write vue
      future maintainers have to rewrite this in vue sorry for that :(
      ~(VK)
      
      */


      (function showNewDomainPopup() {
        // uncomment below line to test locally
        let localhost = "localhost";
        let oldDomain = ["nios-students.pages.dev", localhost];
        const currentDomain = window.location.hostname;
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            if (oldDomain.includes(currentDomain)) {
              initPopup();
            }
          });
        } else {
          // run this only when on user in on old domain
          if (oldDomain.includes(currentDomain)) {
            initPopup();

          }

        }

        function initPopup() {
          // 4-second delay after DOM loads
          setTimeout(() => {
            if (!document.body) return;

            // Check if popup already exists or user has dismissed it
            if (localStorage.getItem('newDomainPopupShown')) {
              return;
            }

            // Create overlay
            const overlay = document.createElement('div');
            Object.assign(overlay.style, {
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: 'oklch(20% 0.05 240 / 0.5)',
              zIndex: '9999',
              display: 'flex',
              justifyContent: 'center',
              // alignItems: 'center',
              opacity: '0',
              transition: 'opacity 0.3s ease-in-out'
            });

            // Create responsive popup container
            const popup = document.createElement('div');
            Object.assign(popup.style, {
              backgroundColor: "#1b1b1f",
              borderRadius: '15px',
              padding: '20px', // Reduced base padding
              width: '90%',
              maxWidth: 'min(90vw, 450px)', // Responsive max width
              maxHeight: '90vh', // Limit height to viewport
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              transform: 'scale(0.7)',
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              opacity: '0',
              textAlign: 'center',
              position: 'relative',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              height: 'fit-content',
              // Mobile-specific responsive styles
              ...(() => {
                // Detect mobile via user agent or screen size
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

                return {
                  padding: isMobile ? '15px' : '30px', // Smaller padding on mobile
                  borderRadius: isMobile ? '12px' : '15px', // Slightly smaller radius
                  fontSize: isMobile ? '14px' : '16px', // Base font size adjustment
                  maxHeight: '85vh', // More headroom on mobile
                  // Touch-friendly spacing
                  ...(isMobile && {
                    paddingBottom: '40px' // Extra space for close button
                  })
                };
              })()
            });


            // Title
            const title = document.createElement('h2');
            Object.assign(title.style, {
              color: 'white',
              margin: '0 0 15px 0',
              fontSize: '24px',
              fontWeight: '600'
            });
            title.textContent = ' Important Update!';

            // Message
            const message = document.createElement('p');
            Object.assign(message.style, {
              color: 'white',
              lineHeight: '1.6',
              margin: '0 0 25px 0',
              fontSize: '16px'
            });


            message.innerHTML = `
  <div style="padding: 20px; background: #ffffffff; border-left: 4px solid #007bff; border-radius: 5px; margin: 10px 0;">
    <h4 style="margin-top: 0; color: #000000ff;">
      <i class="fas fa-info-circle" style="margin-right: 10px; color: #007bff;"></i>
      Domain Migration Notice
    </h4>
    
    <p style="margin-bottom: 18px; color: #000000ff; line-height: 1.6;">
      We've successfully migrated to our new domain. 
      <br> 
      We <strong>strongly recommend</strong> transitioning to the new domain to ensure you continue receiving the latest updates.
    </p>
      <p style="margin-bottom: 18px; color: #000000ff; line-height: 1.6;">
      <a href="https://nios-unofficial.info/" target="_blank" style="text-decoration: none; color: #007bff; font-weight: 600;">Click here</a> to visit the new domain.
      </p>
    
    <div style="background: #e7f3ff; padding: 15px; border-radius: 4px; border-left: 3px solid #007bff; margin: 15px 0;">
      <h5 style="margin-top: 0; color: #0056b3;">
        <i class="fas fa-exclamation-triangle" style="margin-right: 8px; color: #ffc107;"></i>
        Important Note
      </h5>
      <p style="margin: 5px 0 0 0; font-size: 16px; color: #000000ff;">
        Your current old domain will continue to function normally and is <strong>fully unaffected</strong> by this migration. 
        You may continue using it as needed during the transition period.
        all the updates will be made on old donmain too.
      </p>
    </div>
    
  </div>
`;
            // Footer message
            const footer = document.createElement('p');
            Object.assign(footer.style, {
              background: 'linear-gradient(120deg, #bd34fe 30%, #41d1ff), -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '14px',
              margin: '15px 0 0 0',
              fontStyle: 'italic'
            });
            footer.innerHTML = `press ESC to close the popup`;

            // create close button
            const closeButton = document.createElement('button');
            closeButton.innerHTML = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
`;
            Object.assign(closeButton.style, {
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '32px',
              height: '32px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              color: '#ccc',
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            });

            // Hover effects
            closeButton.addEventListener('mouseenter', () => {
              Object.assign(closeButton.style, {
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              });
            });

            closeButton.addEventListener('mouseleave', () => {
              Object.assign(closeButton.style, {
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ccc',
                transform: 'scale(1)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
              });
            });

            // Active state
            closeButton.addEventListener('mousedown', () => {
              closeButton.style.transform = 'scale(0.95)';
            });

            closeButton.addEventListener('mouseup', () => {
              closeButton.style.transform = 'scale(1.05)';
            });

            // Click handler
            closeButton.addEventListener('click', (e) => {
              e.stopPropagation();
              dismissPopup();
            });

            // Accessibility
            closeButton.setAttribute('aria-label', 'Close popup');
            closeButton.setAttribute('role', 'button');
            closeButton.tabIndex = 0;

            // Assemble popup
            popup.appendChild(title);
            popup.appendChild(closeButton);
            popup.appendChild(message);
            popup.appendChild(footer);
            overlay.appendChild(popup);
            document.body.appendChild(overlay);


            // Show with animation
            setTimeout(() => {
              overlay.style.opacity = '1';
              popup.style.opacity = '1';
              popup.style.transform = 'scale(1)';
            }, 100);

            function dismissPopup() {
              overlay.style.opacity = '0';
              popup.style.transform = 'scale(0.7)';
              setTimeout(() => {
                if (overlay.parentNode) {
                  localStorage.setItem('newDomainPopupShown', JSON.stringify({ shown: true, desscription: "this for mod and devs only i don't wnat to show this again and again so i'm adding this to local storage this is workaround for this and i know its not proper way ;)" }));
                  overlay.parentNode.removeChild(overlay);
                }
              }, 300);
            }

            // Close on overlay click (outside popup)
            // overlay.addEventListener('click', (e) => {
            //   if (e.target === overlay) {
            //     dismissPopup();
            //   }
            // });

            // Prevent popup close when clicking inside
            popup.addEventListener('click', (e) => e.stopPropagation());

            // ESC key to close
            const handleEsc = (e: KeyboardEvent) => {
              if (e.key === 'Escape') {
                dismissPopup();
                document.removeEventListener('keydown', handleEsc);
              }
            };
            document.addEventListener('keydown', handleEsc);

            // Prefetch new domain
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = 'https://nios-unofficial.info';
            document.head.appendChild(prefetchLink);
          }, 500);
        }
      })();
      // =================================================================== end of new domain popup ============================================================================

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
                color: 'red',
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
            // im stoping this function popup for now coz is was tempory but if you want to enable it again just add "()" before semicolon below
          });
        }
      }

              // 🚀 NIOSHUB SIDE BUTTON
              (function createNIOSHUBButton() {
                if (document.getElementById('nioshub-side-button')) return;
        
                const button = document.createElement('a');
        
                button.id = 'nioshub-side-button';
                button.href = 'https://nioshub.site';
                button.target = '_blank';
        
                button.innerHTML = `
                  <div style="font-size:18px;">🚀</div>
                  <div>
                    <div style="font-weight:700;">NIOSHUB</div>
                    <div style="font-size:15px; opacity:.85;">
                      Get Handwritten TMA PDFs
                    </div>
                  </div>
                `;
        
                Object.assign(button.style, {
                  position: 'fixed',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: '9999',
        
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
        
                  padding: '14px 18px',
                  borderRadius: '18px',
        
                  textDecoration: 'none',
                  color: 'white',
        
                  background: 'linear-gradient(135deg,#bd34fe,#41d1ff)',
        
                  boxShadow: '0 0 25px rgba(189,52,254,.4)',
        
                  transition: 'all .25s ease',
        
                  fontFamily: 'system-ui'
                });
        
                button.onmouseenter = () => {
                  button.style.transform =
                    'translateY(-50%) translateX(-6px)';
        
                  button.style.boxShadow =
                    '0 0 40px rgba(189,52,254,.6)';
                };
        
                button.onmouseleave = () => {
                  button.style.transform =
                    'translateY(-50%)';
        
                  button.style.boxShadow =
                    '0 0 25px rgba(189,52,254,.4)';
                };
        
                if (window.innerWidth < 768) {
                  Object.assign(button.style, {
                    top: '',
                    bottom: '20px',
                    right: '12px',
                    transform: 'none'
                  });
                }
        
                document.body.appendChild(button);
              })();
      
    });
  }
});
