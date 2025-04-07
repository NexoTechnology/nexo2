document.addEventListener('DOMContentLoaded', function () {
    const introAnimation = document.getElementById('intro-animation');
    const contentWrapper = document.getElementById('content-wrapper');
    const menuSound = document.getElementById('menu-sound');
    const configSound = document.getElementById('config-sound');
    const searchSound = document.getElementById('search-sound');
    const themeSound = document.getElementById('theme-sound');
    const notificationSound = document.getElementById('notification-sound');
    const selectSound = document.getElementById('select-sound');
    const introSound = document.getElementById('intro-sound');
    const clearHistoryButtonPage = document.getElementById('clear-history-page');
    const accessibilityButton = document.getElementById('accessibility-button');
    const accessibilityPanel = document.getElementById('accessibility-options');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const mainContent = document.querySelector('main');
    const originalMainContentHTML = mainContent ? mainContent.innerHTML : "";
    const configButton = document.getElementById('config-button');
    const themeSwitcher = document.getElementById('theme-switcher-page');
    const themeButton = document.getElementById('theme-button-page');
    const notificationsSwitcher = document.getElementById('notifications-switcher-page');
    const notificationsButton = document.getElementById('notifications-button-page');
    const accessibilityOptionsDiv = document.getElementById('accessibility-options');
    const accessibilitySettingsButtonPage = document.getElementById('accessibility-settings-page');
    const accessibilityButtonConfig = document.getElementById('config-button');
    const searchSuggestionsContainer = document.getElementById('search-suggestions');
    const increaseFontButton = document.getElementById('increase-font-button');
    const decreaseFontButton = document.getElementById('decrease-font-button');
    const highContrastButton = document.getElementById('high-contrast-button');
    const dyslexiaFontButton = document.getElementById('dyslexia-font-button');
    const closeAccessibilityButton = document.getElementById('close-accessibility-button');
    const burgerMenuCheckbox = document.getElementById('burger');
    const navMenu = document.getElementById('nav');
    const textSpacingButton = document.getElementById('text-spacing-button');
    const lineHeightButton = document.getElementById('line-height-button');
    const grayscaleButton = document.getElementById('grayscale-button');
    const invertColorsButton = document.getElementById('invert-colors-button');
    const removeAnimationsButton = document.getElementById('remove-animations-button');
    const highlightLinksButton = document.getElementById('highlight-links-button');

    function skipIntro() {
        introAnimation.style.opacity = '0';
        setTimeout(() => {
            introAnimation.style.display = 'none';
            contentWrapper.style.display = 'block';
            contentWrapper.style.opacity = '1';
        }, 500);
        introAnimation.removeEventListener('click', skipIntro);
        introSound.play();
    }

    introAnimation.addEventListener('click', skipIntro);

    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        setTimeout(() => {
            skipIntro();
        }, 3000);
    } else {
        introAnimation.style.display = 'none';
        contentWrapper.style.display = 'block';
        contentWrapper.style.opacity = '1';
    }

    function smoothPageTransition(url) {
        contentWrapper.style.opacity = '0';
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    const navLinks = document.querySelectorAll('#nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetUrl = this.getAttribute('href');
            smoothPageTransition(targetUrl);
        });
    });

    if (burgerMenuCheckbox && navMenu) {
        burgerMenuCheckbox.addEventListener("change", function () {
            navMenu.style.display = this.checked ? "block" : "none";
            if (this.checked) {
                document.body.classList.add('nav-open');
                menuSound.currentTime = 0;
                menuSound.play();
            } else {
                document.body.classList.remove('nav-open');
            }
        });
    }

    const siteIndex = [
        { title: "Início", keywords: ["início", "home", "página inicial", "index"], url: "index.html" },
        { title: "Serviços", keywords: ["serviços", "assistência", "consultoria", "nuvem", "técnica", "especializada", "serviço"], url: "servicos.html" },
        { title: "Produtos", keywords: ["produtos", "ti", "software", "hardware", "comprar", "venda", "produto"], url: "produtos.html" },
        { title: "Contato", keywords: ["contato", "fale conosco", "telefone", "email", "endereço", "contactos", "contacto"], url: "contato.html" },
        { title: "Configurações", keywords: ["configurações", "tema", "idioma", "notificações", "acessibilidade", "privacidade", "conta", "cache", "histórico", "configuracoes"], url: "configuracoes.html" },
        { title: "Central de Ajuda", keywords: ["ajuda", "suporte", "dúvidas", "faq", "problemas", "entrega", "serviço", "site", "técnico", "garantia", "help"], url: "ajuda.html" },
        { title: "Sobre a Nexo", keywords: ["sobre", "nexo", "empresa", "história", "missão", "visão", "valores", "equipe", "about"], url: "index.html#sobre-nexo" },
        { title: "Parceiros", keywords: ["parceiros", "nexora", "parceria", "nexora", "partner"], url: "Parceiros.html" }
    ];

    const searchKeywords = {
        "assistência técnica especializada": { page: "servicos.html" },
        "assistencia tecnica especializada": { page: "servicos.html" },
        "consultoria em tecnologia": { page: "servicos.html" },
        "consultoria tecnologia": { page: "servicos.html" },
        "soluções em nuvem": { page: "servicos.html" },
        "solucoes em nuvem": { page: "servicos.html" },
        "venda de produtos de ti": { page: "produtos.html" },
        "venda produtos ti": { page: "produtos.html" },
        "produtos de ti": { page: "produtos.html" },
        "produtos ti": { page: "produtos.html" },
        "fale conosco": { page: "contato.html" },
        "contato": { page: "contato.html" },
        "configurações": { page: "configuracoes.html" },
        "configuracoes": { page: "configuracoes.html" },
        "central de ajuda": { page: "ajuda.html" },
        "ajuda": { page: "ajuda.html" },
        "parceiros": { page: "parceiros.html" },
        "parceiro": { page: "parceiros.html" }
    };

    const pageURLs = {
        'serviços': 'servicos.html',
        'servico': 'servicos.html',
        'produtos': 'produtos.html',
        'produto': 'produtos.html',
        'contato': 'contato.html',
        'contactos': 'contato.html',
        'contacto': 'contato.html',
        'parceiros': 'parceiros.html',
        'parceiro': 'parceiros.html'
    };

    function clearHighlighting() {
        document.querySelectorAll('.highlight').forEach(el => {
            el.outerHTML = el.innerHTML;
        });
    }

    function highlightText(searchTerm) {
        if (!searchTerm || !mainContent) {
            clearHighlighting();
            return;
        }

        clearHighlighting();

        const textNodes = getTextNodes(mainContent);

        textNodes.forEach(node => {
            const originalText = node.nodeValue;
            if (originalText.toLowerCase().includes(searchTerm.toLowerCase())) {
                const regex = new RegExp(searchTerm, 'gi');
                const highlightedText = originalText.replace(regex, '<span class="highlight">$&</span>');
                let tempElement = document.createElement('div');
                tempElement.innerHTML = highlightedText;

                replaceTextNode(node.parentNode, node, tempElement.childNodes);

            }
        });
    }

    function getTextNodes(element) {
        let textNodes = [];
        if (!element) return textNodes;

        function recursivelyGetTextNodes(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName.toLowerCase() !== 'script' && node.tagName.toLowerCase() !== 'style') {
                    node.childNodes.forEach(recursivelyGetTextNodes);
                }
            }
        }
        recursivelyGetTextNodes(element);
        return textNodes;
    }

    function replaceTextNode(parentNode, originalNode, newNodeList) {
        if (newNodeList && newNodeList.length > 0) {
            newNodeList.forEach(newNode => {
                parentNode.insertBefore(newNode, originalNode);
            });
            parentNode.removeChild(originalNode);
        }
    }


    function performSearch(searchTerm) {
        if (!searchTerm || !mainContent) {
            if (mainContent) mainContent.innerHTML = originalMainContentHTML;
            return;
        }

        const searchTermLower = searchTerm.toLowerCase().trim();

        const indexResults = siteIndex.filter(item => {
            return item.keywords.some(keyword => searchTermLower.includes(keyword));
        });

        if (indexResults.length > 0) {
            window.location.href = indexResults[0].url;
            return;
        }


        if (searchKeywords[searchTermLower]) {
            window.location.href = searchKeywords[searchTermLower].page;
            return;
        }


        for (const key in pageURLs) {
            if (searchTermLower === key) {
                window.location.href = pageURLs[key];
                return;
            }
        }


        const sections = mainContent.querySelectorAll('section.content-section');
        let searchResultsHTML = '';
        let resultsFound = false;

        sections.forEach(section => {
            const sectionText = section.textContent.toLowerCase();
            if (sectionText.includes(searchTerm.toLowerCase())) {
                searchResultsHTML += section.outerHTML;
                resultsFound = true;
            }
        });

        if (resultsFound) {
            mainContent.innerHTML = searchResultsHTML;
        } else {
            mainContent.innerHTML = `<section class="content-section"><p>Nenhum resultado encontrado para "${searchTerm}".</p></section>`;
        }
        highlightText(searchTerm);
    }

    function loadSearchHistory() {
        return JSON.parse(localStorage.getItem('searchHistory') || '[]');
    }

    function saveSearchHistory(history) {
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }

    function displaySearchHistory() {
        const history = loadSearchHistory();
        const ul = searchSuggestionsContainer.querySelector('ul');
        ul.innerHTML = '';

        if (history.length > 0) {
            history.forEach(term => {
                const li = document.createElement('li');
                li.textContent = term;
                li.addEventListener('click', () => {
                    searchInput.value = term;
                    performSearch(term);
                    searchSuggestionsContainer.style.display = 'none';
                });
                ul.appendChild(li);
            });
            searchSuggestionsContainer.style.display = 'block';
        } else {
            searchSuggestionsContainer.style.display = 'none';
        }
    }

    function addToSearchHistory(searchTerm) {
        let history = loadSearchHistory();
        if (!history.includes(searchTerm)) {
            history.unshift(searchTerm);
            if (history.length > 10) {
                history.pop();
            }
            saveSearchHistory(history);
        }
    }

    if (searchButton) {
        searchButton.addEventListener('click', function () {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
                addToSearchHistory(searchTerm);
            }
            searchSuggestionsContainer.style.display = 'none';
            searchSound.currentTime = 0;
            searchSound.play();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    performSearch(searchTerm);
                    addToSearchHistory(searchTerm);
                }
                searchSuggestionsContainer.style.display = 'none';
                searchSound.currentTime = 0;
                searchSound.play();
                event.preventDefault();
            }
        });

        searchInput.addEventListener('focus', displaySearchHistory);
        searchInput.addEventListener('click', displaySearchHistory);

        document.addEventListener('click', function(event) {
            if (!searchSuggestionsContainer.contains(event.target) && !searchInput.contains(event.target)) {
                searchSuggestionsContainer.style.display = 'none';
            }
        });
    }

    if (configButton) {
        configButton.addEventListener('click', function (event) {
            window.location.href = 'configuracoes.html';
            configSound.currentTime = 0;
            configSound.play();
        });
    }

    function updateTheme(isLightTheme) {
        if (isLightTheme) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            if (themeButton) themeButton.querySelector('.button-text').textContent = 'Tema Escuro';
             document.querySelector('.nexo-logo').src = 'imagens/NexoLogo-dark.png';

        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            if (themeButton) themeButton.querySelector('.button-text').textContent = 'Tema Claro';
             document.querySelector('.nexo-logo').src = 'imagens/NexoLogo.png';
        }
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    }


    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', function () {
            updateTheme(this.checked);
        });
    }

    if (themeButton) {
        themeButton.addEventListener('click', function () {
            if (themeSwitcher) themeSwitcher.checked = !themeSwitcher.checked;
            updateTheme(themeSwitcher ? themeSwitcher.checked : document.body.classList.contains('light-theme'));
            themeSound.currentTime = 0;
            themeSound.play();
        });
    }

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        updateTheme(true);
        if (themeSwitcher) themeSwitcher.checked = true;
         document.querySelector('.nexo-logo').src = 'imagens/NexoLogo-dark.png';
    } else {
        updateTheme(false);
        if (themeSwitcher) themeSwitcher.checked = false;
         document.querySelector('.nexo-logo').src = 'imagens/NexoLogo.png';
    }

    function updateNotifications(areEnabled) {
        if (notificationsButton) notificationsButton.querySelector('.button-text').textContent = areEnabled ? 'Ativadas' : 'Desativadas';
        alert('Notificações ' + (areEnabled ? 'ativadas' : 'desativadas'));
    }

    if (notificationsSwitcher) {
        notificationsSwitcher.addEventListener('change', function () {
            updateNotifications(this.checked);
        });
    }

    if (notificationsButton) {
        notificationsButton.addEventListener('click', function () {
            if (notificationsSwitcher) notificationsSwitcher.checked = !notificationsSwitcher.checked;
            updateNotifications(notificationsSwitcher ? notificationsSwitcher.checked : false);
            notificationSound.currentTime = 0;
            notificationSound.play();
        });
    }

    const languageSelect = document.getElementById('language-select-page');
    if (languageSelect) {
        languageSelect.addEventListener('change', function () {
            alert('Idioma selecionado: ' + this.value);
            selectSound.currentTime = 0;
            selectSound.play();
        });
    }

     if (accessibilitySettingsButtonPage) {
         accessibilitySettingsButtonPage.addEventListener('click', function() {
             alert('Painel de Acessibilidade (Funcionalidade em desenvolvimento). Em breve, você poderá personalizar a sua experiência de navegação para melhor atender às suas necessidades.');
             selectSound.currentTime = 0;
             selectSound.play();
         });
     }

     if (accessibilityButtonConfig) {
         accessibilityButtonConfig.addEventListener('click', function(event) {
            if (window.location.href.includes('configuracoes.html')) {
                configSound.currentTime = 0;
                configSound.play();
                return;
            }

            if (accessibilityOptionsDiv.style.display === 'none') {
                accessibilityOptionsDiv.style.display = 'block';
                document.body.classList.add('modal-open');
                accessibilityButtonConfig.setAttribute('aria-expanded', 'true');
                accessibilityOptionsDiv.setAttribute('aria-hidden', 'false');

            } else {
                accessibilityOptionsDiv.style.display = 'none';
                document.body.classList.remove('modal-open');
                 accessibilityButtonConfig.setAttribute('aria-expanded', 'false');
                 accessibilityOptionsDiv.setAttribute('aria-hidden', 'true');
            }
         });
      }

      if (closeAccessibilityButton) {
          closeAccessibilityButton.addEventListener('click', function() {
              accessibilityOptionsDiv.style.display = 'none';
              document.body.classList.remove('modal-open');
              accessibilityButtonConfig.setAttribute('aria-expanded', 'false');
              accessibilityOptionsDiv.setAttribute('aria-hidden', 'true');
          });
      }

       let fontSizeFactor = 1;
       let baseFontSize = parseFloat(window.getComputedStyle(document.body, null).fontSize);

       function updateFontSize() {
           document.querySelectorAll('body, h1, h2, h3, h4, h5, h6, p, a, li, label, button, input, select, textarea').forEach(element => {
               element.style.fontSize = `${baseFontSize * fontSizeFactor}rem`;
           });
       }

       if (increaseFontButton) {
           increaseFontButton.addEventListener('click', function() {
               fontSizeFactor += 0.05;
               updateFontSize();
           });
       }

       if (decreaseFontButton) {
           decreaseFontButton.addEventListener('click', function() {
               fontSizeFactor = Math.max(0.8, fontSizeFactor - 0.05);
               updateFontSize();
           });
       }

       let isHighContrast = false;
       if (highContrastButton) {
           highContrastButton.addEventListener('click', function() {
               isHighContrast = !isHighContrast;
               document.body.classList.toggle('high-contrast', isHighContrast);
           });
       }

       let isDyslexiaFont = false;
       if (dyslexiaFontButton) {
           dyslexiaFontButton.addEventListener('click', function() {
               isDyslexiaFont = !isDyslexiaFont;
               document.body.classList.toggle('dyslexia-font', isDyslexiaFont);
           });
       }

        let isTextSpacing = false;
        if (textSpacingButton) {
            textSpacingButton.addEventListener('click', function() {
                isTextSpacing = !isTextSpacing;
                document.body.classList.toggle('text-spacing', isTextSpacing);
            });
        }

        let isLineHeight = false;
        if (lineHeightButton) {
            lineHeightButton.addEventListener('click', function() {
                isLineHeight = !isLineHeight;
                document.body.classList.toggle('increased-line-height', isLineHeight);
            });
        }

        let isGrayscale = false;
        if (grayscaleButton) {
            grayscaleButton.addEventListener('click', function() {
                isGrayscale = !isGrayscale;
                document.body.classList.toggle('grayscale', isGrayscale);
            });
        }

        let isInvertColors = false;
        if (invertColorsButton) {
            invertColorsButton.addEventListener('click', function() {
                isInvertColors = !isInvertColors;
                document.body.classList.toggle('invert-colors', isInvertColors);
            });
        }

        let areAnimationsRemoved = false;
        if (removeAnimationsButton) {
            removeAnimationsButton.addEventListener('click', function() {
                areAnimationsRemoved = !areAnimationsRemoved;
                document.body.classList.toggle('no-animations', areAnimationsRemoved);
            });
        }

        let areLinksHighlighted = false;
        if (highlightLinksButton) {
            highlightLinksButton.addEventListener('click', function() {
                areLinksHighlighted = !areLinksHighlighted;
                document.body.classList.toggle('highlight-links', areLinksHighlighted);
            });
        }

     if (clearCacheButton) {
         clearCacheButton.addEventListener('click', function () {
             localStorage.clear();
             alert('Cache do site limpo! Local Storage foi limpo.');
             selectSound.currentTime = 0;
             selectSound.play();
         });
     }

       if (clearHistoryButtonPage) {
          clearHistoryButtonPage.addEventListener('click', function () {
              localStorage.removeItem('searchHistory');
              alert('Histórico de busca limpo!');
              searchSuggestionsContainer.querySelector('ul').innerHTML = '';
              searchSuggestionsContainer.style.display = 'none';
              selectSound.currentTime = 0;
              selectSound.play();
          });
      }

     const privacyPolicyButton = document.getElementById('privacy-policy-page');
     if (privacyPolicyButton) {
         privacyPolicyButton.addEventListener('click', function () {
             alert('Política de Privacidade (link fictício).');
             selectSound.currentTime = 0;
             selectSound.play();
         });
     }

     const accountSettingsButton = document.getElementById('account-settings-page');
     if (accountSettingsButton) {
         accountSettingsButton.addEventListener('click', function () {
             alert('Gerenciar Conta (link fictício).');
             selectSound.currentTime = 0;
             selectSound.play();
         });
     }

     const helpPageButton = document.getElementById('help-page');
     if (helpPageButton) {
         helpPageButton.addEventListener('click', function () {
             window.location.href = 'ajuda.html';
             selectSound.currentTime = 0;
             selectSound.play();
         });
     }

     const aboutUsButton = document.getElementById('about-us-page');
     if (aboutUsButton) {
         aboutUsButton.addEventListener('click', function () {
             window.location.href = 'index.html#sobre-nexo';
             selectSound.currentTime = 0;
             selectSound.play();
         });
     }

     const termsOfUseButton = document.getElementById('terms-of-use-page');
     if (termsOfUseButton) {
         termsOfUseButton.addEventListener('click', function () {
             alert('Termos de Uso (link fictício).');
             selectSound.currentTime = 0;
             selectSound.play();
         });
     }
 });

document.addEventListener('DOMContentLoaded', function() {
     const accessibilityButton = document.getElementById('accessibility-button');
     const accessibilityPanel = document.getElementById('accessibility-options');

     if (accessibilityButton && accessibilityPanel) {
         accessibilityButton.addEventListener('click', function(event) {
             event.stopPropagation();
             accessibilityPanel.style.display = accessibilityPanel.style.display === 'block' ? 'none' : 'block';
             document.body.classList.toggle('modal-open', accessibilityPanel.style.display === 'block');
             accessibilityButton.setAttribute('aria-expanded', accessibilityPanel.style.display === 'block' ? 'true' : 'false');
              accessibilityPanel.setAttribute('aria-hidden', accessibilityPanel.style.display === 'block' ? 'false' : 'true');

         });

         document.addEventListener('click', function(event) {
             if (!accessibilityPanel.contains(event.target) && !accessibilityButton.contains(event.target)) {
                 accessibilityPanel.style.display = 'none';
                 document.body.classList.remove('modal-open');
                 accessibilityButton.setAttribute('aria-expanded', 'false');
                 accessibilityPanel.setAttribute('aria-hidden', 'true');
             }
         });

         document.addEventListener('keydown', function(event) {
             if (event.key === 'Escape' && accessibilityPanel.style.display === 'block') {
                 accessibilityPanel.style.display = 'none';
                 document.body.classList.remove('modal-open');
                  accessibilityButton.setAttribute('aria-expanded', 'false');
                  accessibilityPanel.setAttribute('aria-hidden', 'true');
             }
         });
     }
 });

document.addEventListener('DOMContentLoaded', function() {
  const configButton = document.getElementById('config-button');
  if (configButton) {
    configButton.addEventListener('click', function (event) {
           window.location.href = 'configuracoes.html';
          });
  }
 })