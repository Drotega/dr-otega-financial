document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       HEADER SCROLL EFFECT
       ========================================== */
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       MOBILE DRAWER NAVIGATION
       ========================================== */
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        mobileDrawer.classList.toggle('active');
        // Prevent body scrolling when menu is open
        document.body.style.overflow = mobileDrawer.classList.contains('active') ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================
       SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once shown
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null, // Viewport
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset bottom trigger
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================
       INTERACTIVE POLICY TAB SELECTOR
       ========================================== */
    const tabBtnHave = document.getElementById('tab-btn-have');
    const tabBtnNeed = document.getElementById('tab-btn-need');
    const panelHave = document.getElementById('panel-have');
    const panelNeed = document.getElementById('panel-need');

    const switchTab = (activeBtn, activePanel, inactiveBtn, inactivePanel) => {
        activeBtn.classList.add('active');
        activePanel.classList.add('active');
        inactiveBtn.classList.remove('active');
        inactivePanel.classList.remove('active');
    };

    tabBtnHave.addEventListener('click', () => {
        switchTab(tabBtnHave, panelHave, tabBtnNeed, panelNeed);
    });

    tabBtnNeed.addEventListener('click', () => {
        switchTab(tabBtnNeed, panelNeed, tabBtnHave, panelHave);
    });

    /* ==========================================
       INTERACTIVE NET WORTH CALCULATOR
       ========================================== */
    const assetsRange = document.getElementById('assets-range');
    const liabilitiesRange = document.getElementById('liabilities-range');
    
    const assetsValLabel = document.getElementById('assets-val');
    const liabilitiesValLabel = document.getElementById('liabilities-val');
    
    const netWorthAmountLabel = document.getElementById('net-worth-amount');
    const gaugeBar = document.getElementById('gauge-bar');

    // Currency Formatter Utility
    const formatCurrency = (value) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        });
        return formatter.format(value);
    };

    const updateCalculator = () => {
        const assets = parseInt(assetsRange.value, 10);
        const liabilities = parseInt(liabilitiesRange.value, 10);
        
        // Update Labels
        assetsValLabel.textContent = formatCurrency(assets);
        liabilitiesValLabel.textContent = formatCurrency(liabilities);
        
        // Calculate Net Worth
        const netWorth = assets - liabilities;
        
        // Update Display Amount
        netWorthAmountLabel.textContent = formatCurrency(netWorth);
        
        // Handle negative Net Worth styling
        if (netWorth < 0) {
            netWorthAmountLabel.classList.add('negative');
        } else {
            netWorthAmountLabel.classList.remove('negative');
        }
        
        // Calculate Asset Ratio for the Gauge: assets / (assets + liabilities)
        const total = assets + liabilities;
        let ratioPercent = 50; // Default when both are zero
        
        if (total > 0) {
            ratioPercent = (assets / total) * 100;
        }
        
        // Update visual gauge fill width
        gaugeBar.style.width = `${ratioPercent}%`;
    };

    // Event Listeners for Range Input Sliders
    assetsRange.addEventListener('input', updateCalculator);
    liabilitiesRange.addEventListener('input', updateCalculator);

    // Initial run to establish values
    updateCalculator();

    /* ==========================================
       LEAD FORM CAPTURE (DOWNLOAD WORKSHEET)
       ========================================== */
    const leadForm = document.getElementById('lead-form');
    const successBox = document.getElementById('download-success');

    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('lead-name').value;
        const email = document.getElementById('lead-email').value;
        
        console.log(`Lead Captured: Name = "${name}", Email = "${email}". Preparing worksheet download placeholder.`);
        
        // Hide form and show success state
        leadForm.style.display = 'none';
        successBox.style.display = 'block';
        
        // Trigger a simulated browser file download (using a text file placeholder)
        simulateFileDownload(name);
    });

    const simulateFileDownload = (clientName) => {
        const fileContent = `==========================================================\nDR. OTEGA OJUKWU - LICENSED FINANCIAL PROFESSIONAL\nPERSONAL NET WORTH WORKSHEET\n==========================================================\n\nPrepared for: ${clientName}\nDate generated: ${new Date().toLocaleDateString()}\n\nUse this worksheet to calculate your true financial baseline.\n\nASSETS:\n1. Cash & Bank Accounts: $___________\n2. Investments & Brokerage: $___________\n3. Retirement Accounts (401k/IRA): $___________\n4. Life Insurance Cash Value: $___________\n5. Real Estate Values: $___________\n6. Vehicles & Personal Property: $___________\nTOTAL ASSETS: $______________________ (A)\n\nLIABILITIES:\n1. Mortgages & Home Loans: $___________\n2. Student Loans: $___________\n3. Auto Loans: $___________\n4. Credit Card Debts: $___________\n5. Other Personal Liabilities: $___________\nTOTAL LIABILITIES: $_________________ (B)\n\nNET WORTH CALCULATION:\nTotal Assets (A) - Total Liabilities (B) = NET WORTH\nYour Net Worth: $______________________\n\n----------------------------------------------------------\n"Protect Today. Build Tomorrow. Leave a Legacy."\nSchedule a consultation to audit your results:\nhttps://calendar.app.google/dER16uXvznYUicrw5\n==========================================================`;
        
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `Net_Worth_Worksheet_Dr_Otega_Ojukwu.txt`;
        document.body.appendChild(a);
        a.click();
        
        // Clean up URL object
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 100);
    };

});
