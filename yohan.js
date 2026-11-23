/**
 * Yohan.AI — Lance's AI Assistant
 * Standalone assistant logic extracted from index.html
 * Handles: chat window, expand/collapse cycle, quick chips, messaging, typing indicator,
 * round-robin reply rotation, section navigation, and personal fallback.
 */

(() => {
    // ============================================================
    // DOM References
    // ============================================================
    const launcherWrapper = document.getElementById('yohan-launcher-wrapper');
    const btn = document.getElementById('yohan-btn');
    const windowEl = document.getElementById('yohan-window');
    const closeBtn = document.getElementById('yohan-close');
    const expandBtn = document.getElementById('yohan-expand-btn');
    const messagesEl = document.getElementById('yohan-messages');
    const chipsWrapper = document.getElementById('yohan-chips-wrapper');
    const chipsTrack = document.getElementById('yohan-chips-track');
    const chipsPrevBtn = document.getElementById('yohan-chips-prev');
    const chipsNextBtn = document.getElementById('yohan-chips-next');
    const form = document.getElementById('yohan-form');
    const input = document.getElementById('yohan-input');
    const floatingHeader = document.querySelector('.floating-header');

    // ============================================================
    // State
    // ============================================================
    let isOpen = false;
    let expandTimer = null;
    let collapseTimer = null;

    // Quick question chips data
    const quickQuestions = [
        "Who is Lance?",
        "What roles is he open for?",
        "Where did he study & intern?",
        "What are his best works?",
        "What tools & tech does he use?",
        "How can I contact Lance?",
        "May kanin na ba, Boseng?"
    ];

    // Round-robin rotation tracker for each intent
    const yohanRotationIndex = {};

    // ============================================================
    // Helpers
    // ============================================================

    // Align launcher and chat window with floating header's right edge
    function alignWithHeader() {
        if (!floatingHeader) return;
        const headerRect = floatingHeader.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const rightOffset = viewportWidth - headerRect.right;
        launcherWrapper.style.right = rightOffset + 'px';
        windowEl.style.right = rightOffset + 'px';
    }

    // Run on load and resize
    window.addEventListener('load', alignWithHeader);
    window.addEventListener('resize', alignWithHeader);

    // Render quick question chips with sparkle prefix
    function renderChips() {
        chipsTrack.innerHTML = '';
        quickQuestions.forEach(q => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'yohan-chip';
            chip.innerHTML = '<span class="yohan-chip-sparkle">✦</span>' + q;
            chip.addEventListener('click', () => handleUserQuery(q));
            chipsTrack.appendChild(chip);
        });
    }

    // Append a message bubble with sender name and avatar
    function appendMessage(text, isUser = false, senderName = null, isPersonal = false) {
        const wrapper = document.createElement('div');
        wrapper.className = 'yohan-message-wrapper ' + (isUser ? 'user' : 'bot');

        if (isUser) {
            // User message: sender name + bubble, right-aligned
            const nameEl = document.createElement('div');
            nameEl.className = 'yohan-sender-name';
            nameEl.textContent = 'You';
            wrapper.appendChild(nameEl);

            const div = document.createElement('div');
            div.className = 'yohan-message user';
            div.innerHTML = text;
            wrapper.appendChild(div);
        } else {
            // Bot message: avatar on left, sender name + bubble on right
            const avatar = document.createElement('img');
            avatar.className = 'yohan-message-avatar';
            avatar.src = isPersonal ? 'Assets/lance.png' : 'Assets/lancestudios.png';
            avatar.alt = senderName || 'Yohan';
            avatar.draggable = false;

            const contentWrapper = document.createElement('div');
            contentWrapper.style.display = 'flex';
            contentWrapper.style.flexDirection = 'column';
            contentWrapper.style.gap = '4px';

            if (senderName) {
                const nameEl = document.createElement('div');
                nameEl.className = 'yohan-sender-name';
                nameEl.textContent = senderName;
                contentWrapper.appendChild(nameEl);
            }

            const div = document.createElement('div');
            div.className = 'yohan-message bot';
            div.innerHTML = text;
            contentWrapper.appendChild(div);

            wrapper.appendChild(avatar);
            wrapper.appendChild(contentWrapper);
        }

        messagesEl.appendChild(wrapper);
        scrollToBottom();
    }

    // Show typing indicator
    function showTyping() {
        const wrapper = document.createElement('div');
        wrapper.className = 'yohan-typing-wrapper';
        wrapper.id = 'yohan-typing-indicator';

        const avatar = document.createElement('img');
        avatar.className = 'yohan-message-avatar';
        avatar.src = 'Assets/lancestudios.png';
        avatar.alt = 'Yohan';
        avatar.draggable = false;

        const contentWrapper = document.createElement('div');
        contentWrapper.style.display = 'flex';
        contentWrapper.style.flexDirection = 'column';
        contentWrapper.style.gap = '4px';

        const nameEl = document.createElement('div');
        nameEl.className = 'yohan-sender-name';
        nameEl.textContent = 'Yohan';
        contentWrapper.appendChild(nameEl);

        const div = document.createElement('div');
        div.className = 'yohan-typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        contentWrapper.appendChild(div);

        wrapper.appendChild(avatar);
        wrapper.appendChild(contentWrapper);

        messagesEl.appendChild(wrapper);
        scrollToBottom();
    }

    // Hide typing indicator
    function hideTyping() {
        const typing = document.getElementById('yohan-typing-indicator');
        if (typing) typing.remove();
    }

    // Scroll messages to bottom
    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    // Helper: returns next reply in sequence for a given intent key
    function getRotatedReply(intentKey, repliesArray) {
        const idx = yohanRotationIndex[intentKey] || 0;
        yohanRotationIndex[intentKey] = (idx + 1) % repliesArray.length;
        return repliesArray[idx];
    }

    // ============================================================
    // Response Functions (Round-Robin Rotation — 3 Variations Each)
    // ============================================================

    function getKaninResponse() {
        const statusEl = document.getElementById('hero-status-text');
        const currentStatus = statusEl ? statusEl.textContent : 'Currently Intern at NCMB';
        const replies = [
            'Checking Lance\'s live status... It currently says: <strong>"' + currentStatus + '"</strong> — mukhang naghahanap pa rin ng kanin si Boseng!',
            'Live status update mula kay Lance: <strong>"' + currentStatus + '"</strong>. Sana may nag-abot na ng extra rice diyan! 🍚',
            'Eto ang real-time status ni Boseng ngayon: <strong>"' + currentStatus + '"</strong> — active pa rin sa grind!'
        ];
        return { text: getRotatedReply('kanin_status', replies), sender: 'Yohan' };
    }

    function getContactResponse() {
        const replies = [
            'You can reach Lance directly via phone/SMS at <strong>+63 910 251 2362</strong> or email at <strong>borras.lanceharvey.belleca@gmail.com</strong>. You can also connect with him on Facebook (<em>/edu.lanceeborras</em>), LinkedIn (<em>/in/lance-harvey-borras</em>), and GitHub (<em>@lanceeyboo</em>).<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#contact\')">Go to Contacts ↗</button>',
            'Madali lang kontakin si Lance! Tawag or text ka sa <strong>+63 910 251 2362</strong>, or mag-send ng email sa <strong>borras.lanceharvey.belleca@gmail.com</strong>. Active din siya sa Facebook, LinkedIn, at GitHub!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#contact\')">Go to Contacts ↗</button>',
            'Ready for inquiries si Lance! Save mo na \'to: Mobile <strong>+63 910 251 2362</strong> | Email <strong>borras.lanceharvey.belleca@gmail.com</strong>. Pwede mo ring pindutin ang button sa baba para mag-direct sa Contacts section!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#contact\')">Go to Contacts ↗</button>'
        ];
        return { text: getRotatedReply('contact', replies), sender: 'Yohan' };
    }

    function getToolsResponse() {
        const replies = [
            'For visuals and live media, Lance uses <strong>Photoshop, Figma, Canva, CapCut, OBS Studio, and ProPresenter</strong>. For development, he builds with <strong>HTML, CSS, JavaScript, Node.js, Git/GitHub</strong>, alongside AI tools like <strong>Gemini, ChatGPT, Claude, and DeepSeek</strong>.<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#tools\')">View Tools Section ↗</button>',
            'All-around ang toolkit ni Lance! Sa creative & production side: <strong>Photoshop, Figma, Canva, CapCut, at OBS Studio</strong>. Sa web dev naman: <strong>HTML, CSS, JS, Node.js, Git</strong>, plus AI workflows gamit ang <strong>Gemini, Claude, ChatGPT, at DeepSeek</strong>.<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#tools\')">View Tools Section ↗</button>',
            'Pinagsasama ni Lance ang design at code—gamit ang <strong>Figma & Photoshop</strong> para sa UI/visuals, at <strong>HTML/CSS/JS, Node.js, at AI tools</strong> para gawing interactive ang bawat website!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#tools\')">View Tools Section ↗</button>'
        ];
        return { text: getRotatedReply('tools', replies), sender: 'Yohan' };
    }

    function getWorksResponse() {
        const replies = [
            'His portfolio covers three main areas: <strong>Visuals</strong> (event posters like Azure, Code Quest 2025, and Occupational Safety), <strong>Merchandise</strong> (JPCS-QCU lanyards, pins, and polo mockups), and <strong>Brands</strong> (official seals for JPCS-QCU, Glory in the Highest Bible School, and Lance Studios). Check out the Work Gallery section to view them in 3D!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#works\')">Direct to Work Gallery ↗</button>',
            'Maraming solid na gawa si Lance—mula sa <strong>JPCS-QCU official seal & lanyards</strong>, event posters gaya ng <strong>Code Quest 2025 at Azure</strong>, hanggang sa interactive web systems! Silipin mo lahat sa 3D Work Gallery.<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#works\')">Direct to Work Gallery ↗</button>',
            'Naka-organize ang works ni Lance sa <strong>Visuals, Merchandise, at Brands</strong>. Pindutin mo lang yung button sa baba para ma-explore mo sila sa 3D gallery!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#works\')">Direct to Work Gallery ↗</button>'
        ];
        return { text: getRotatedReply('works', replies), sender: 'Yohan' };
    }

    function getEducationResponse() {
        const replies = [
            'He studies BS Computer Science at <strong>Quezon City University</strong> (2023–Present) and completed his Frontend Developer Internship at the <strong>National Conciliation and Mediation Board (NCMB)</strong> in Quezon City. He also served as the Founding Head of the Visual Arts Department for JPCS – QCU Chapter!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#background\')">View Background ↗</button>',
            '4th-year BSCS student si Lance sa <strong>Quezon City University (QCU)</strong>, nag-intern bilang Frontend Developer sa <strong>NCMB</strong>, at naging Founding Head din ng Visual Arts Department sa <strong>JPCS – QCU Chapter</strong>!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#background\')">View Background ↗</button>',
            'Strong ang background ni Lance sa tech at leadership: BS Computer Science sa <strong>QCU</strong>, Frontend Developer Intern sa <strong>NCMB</strong>, at Visual Arts Department Head sa <strong>JPCS-QCU</strong>.<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#background\')">View Background ↗</button>'
        ];
        return { text: getRotatedReply('education_internship', replies), sender: 'Yohan' };
    }

    function getRolesResponse() {
        const replies = [
            'Lance is currently open for opportunities as a <strong>Graphic Designer</strong>, <strong>Visual Artist</strong>, <strong>UI/UX Designer</strong>, or <strong>Frontend Developer</strong>. Feel free to check the Contact section or download his Resume & Portfolio!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#contact\')">Hire / Contact Lance ↗</button>',
            'Open for hire at commissions si Lance! Available siya para sa <strong>Graphic Design, Visual Arts, UI/UX Design, at Frontend Development</strong> roles.<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#contact\')">Hire / Contact Lance ↗</button>',
            'Naghahanap ka ba ng creative developer? Available si Lance bilang <strong>UI/UX Designer, Frontend Developer, o Graphic Designer</strong>—message mo na siya sa Contacts!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#contact\')">Hire / Contact Lance ↗</button>'
        ];
        return { text: getRotatedReply('roles', replies), sender: 'Yohan' };
    }

    function getProfileResponse() {
        const replies = [
            '<strong>Lance Harvey B. Borras</strong> is a 4th-year BS Computer Science student at Quezon City University (QCU) and the founder of <strong>Lance Studios</strong>. He blends visual artistry with frontend development—specializing in graphic design, UI/UX, and interactive web experiences.<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#profile\')">View Profile ↗</button>',
            'Si <strong>Lance Harvey B. Borras</strong> ay isang multi-disciplinary Visual Artist, UI/UX Designer, at Frontend Developer mula sa QCU—ang utak sa likod ng <strong>Lance Studios</strong>!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#profile\')">View Profile ↗</button>',
            'Meet <strong>Lance Harvey</strong>: Computer Science student by day, Visual Artist & Frontend Developer by passion. Pinagsasama niya ang clean code at eye-catching design!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#profile\')">View Profile ↗</button>'
        ];
        return { text: getRotatedReply('profile', replies), sender: 'Yohan' };
    }

    function getGreetingResponse() {
        const replies = [
            'Hello! 👋 Ayos na ayos naman ako, 100% charged ang circuits! Ikaw, kamusta? Feel free to ask me about Lance\'s <strong>works, tools, background, or contact details</strong>!',
            'Uy, kamusta! 😄 Sakto ang daan mo sa portfolio ni Lance. Ano gusto mong silipin natin today—yung <strong>3D Work Gallery</strong> o yung <strong>tech & design tools</strong> niya?',
            'Hey there! ✨ Ready na ako mag-tour sa\'yo dito sa <strong>Lance Studios</strong>. Tanong ka lang kahit ano tungkol kay Lance o pindutin mo yung quick questions sa baba!'
        ];
        return { text: getRotatedReply('greetings', replies), sender: 'Yohan' };
    }

    function getDoingResponse() {
        const replies = [
            'Eto, naka-duty 24/7 para i-tour ka sa portfolio ni Lance! Habang si Lance naman ay busy mag-design, mag-code, at maghanap ng kanin. 😄 Ano gusto mong i-check natin—<strong>Works</strong> o <strong>Tools</strong>?',
            'Nagbabantay lang ng portfolio habang nagkakape at nag-eedit ng visuals si Lance! ☕ Gusto mo bang ipakita ko sa\'yo yung mga latest projects niya?',
            'Chill lang dito sa lower right corner, naghihintay ng mga mag-i-inquire o magha-hire kay Lance! Ikaw, anong hanap mo—<strong>Graphic Design</strong> o <strong>Web Dev</strong>?'
        ];
        return { text: getRotatedReply('what_doing', replies), sender: 'Yohan' };
    }

    function getIdentityResponse() {
        const replies = [
            'Ako si <strong>Yohan</strong>, ang custom AI assistant ni Lance Harvey dito sa Lance Studios! Naka-program ako para sagutin lahat ng tanong mo tungkol sa skills, projects, at contact info niya.',
            'I\'m <strong>Yohan</strong>! 🤖 Digital wingman ako ni Lance dito sa website niya. Pwede mo akong tanungin tungkol sa education, internship, works, o kahit contact number niya.',
            'Si <strong>Yohan</strong> \'to—built right into Lance\'s portfolio para hindi mo na kailangang mag-scroll nang matagal para makilala siya!'
        ];
        return { text: getRotatedReply('bot_identity', replies), sender: 'Yohan' };
    }

    function getComplimentResponse() {
        const replies = [
            'Sabi na eh, may taste ka! 😎 Agree ako diyan—parehong solid ang visuals at code ni Lance. Gusto mo bang makita yung iba pa niyang gawa sa <strong>Work Gallery</strong>?<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#works\')">Check Work Gallery ↗</button>',
            'Sheesh, maraming salamat! 🔥 Matutuwa si Lance pag nabasa niya \'yan. Silipin mo na rin yung mga designs at seals niya sa <strong>Work Gallery</strong>!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#works\')">Check Work Gallery ↗</button>',
            'Legit \'yan boss! 💯 Pinaghirapan talaga ni Lance bawat pixel at animation dito. Tara, check natin yung <strong>Work Gallery</strong>!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#works\')">Check Work Gallery ↗</button>'
        ];
        return { text: getRotatedReply('compliments', replies), sender: 'Yohan' };
    }

    function getPlayfulResponse() {
        const replies = [
            'Hoy grabe ka na boss! 😂 AI lang ako pero marunong din akong masaktan—charot! Kung trip mo lang mang-asar, okay lang basta tingnan mo muna yung <strong>Work Gallery</strong> o i-hire mo na si Lance!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#works\')">Direct to Work Gallery ↗</button>',
            'Aray ko naman pre! 🤣 Walang ganyanan, tropa tayo dito! Bawi ka na lang sa pag-check ng <strong>Work Gallery</strong> ni Lance!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#works\')">Direct to Work Gallery ↗</button>',
            'Huli ka! Nangtitrip ka lang dito sa portfolio eh no? 😆 Sige na, i-browse mo na muna yung mga projects ni Lance bago ka umalis!<br><button class="yohan-action-btn" onclick="yohanNavigateTo(\'#works\')">Direct to Work Gallery ↗</button>'
        ];
        return { text: getRotatedReply('banter', replies), sender: 'Yohan' };
    }

    function getThanksResponse() {
        const replies = [
            'Walang anuman! 🙌 Salamat sa pagbisita sa portfolio ni Lance Harvey. Kapag ready ka na mag-collab or mag-hire, nandiyan lang ang <strong>Contacts</strong> button!',
            'Anytime boss! ✨ Balik ka ulit dito sa <strong>Lance Studios</strong> ha. Ingat!',
            'You\'re very welcome! 😊 Kung may kailangan kang graphic design, UI/UX, or frontend project, message mo lang si Lance anytime!'
        ];
        return { text: getRotatedReply('thanks_bye', replies), sender: 'Yohan' };
    }

    // Fallback — Personal reply from Lance Harvey
    function getFallbackResponse() {
        const replies = [
            'Hmm, mukhang hindi pa na-train ni Yohan yung sagot diyan! 😅 Pero ako na sasagot—pwede mo akong tanungin tungkol sa <strong>profile, works, tools, education, internship, o contact details</strong> ko, or pindutin mo lang yung mga quick questions sa baba!',
            'Ako na muna sasagot dito boss, medyo nag-loading si Yohan sa tanong mo! 😂 Ask ka lang tungkol sa <strong>projects, tech stack, o contact info</strong> ko, or tap the quick chips below!',
            'Pass muna si Yohan diyan kaya ako na sumingit! 👋 Kung may specific inquiry ka, i-text mo na lang ako sa <strong>+63 910 251 2362</strong> o i-check yung quick questions sa baba!'
        ];
        return { text: getRotatedReply('lance_fallback', replies), sender: 'Lance Harvey', isPersonal: true };
    }

    // ============================================================
    // Intent Matching — Strict Whole-Word Regex with Priority Order
    // ============================================================
    function getBotResponse(query) {
        // Exact match for preset chip questions (highest priority)
        if (query === "May kanin na ba, Boseng?") {
            return getKaninResponse();
        }
        if (query === "How can I contact Lance?") {
            return getContactResponse();
        }
        if (query === "What tools & tech does he use?") {
            return getToolsResponse();
        }
        if (query === "What are his best works?") {
            return getWorksResponse();
        }
        if (query === "Where did he study & intern?") {
            return getEducationResponse();
        }
        if (query === "What roles is he open for?") {
            return getRolesResponse();
        }
        if (query === "Who is Lance?") {
            return getProfileResponse();
        }

        const lower = query.toLowerCase();

        // 1. Kanin / Live Status Easter Egg
        if (/\b(kanin|rice|boseng|gutom|kain|status)\b/i.test(lower)) {
            return getKaninResponse();
        }

        // 2. Contact / Phone / Socials
        if (/\b(contact|contacts|number|phone|call|text|sms|email|gmail|facebook|github|linkedin|reach|resume|cv)\b/i.test(lower)) {
            return getContactResponse();
        }

        // 3. Tools & Tech Stack
        if (/\b(tool|tools|tech|stack|software|language|code|coding|photoshop|figma|canva|capcut|obs|propresenter|node|git|github|gemini|chatgpt|claude|deepseek|ai)\b/i.test(lower)) {
            return getToolsResponse();
        }

        // 4. Works / Projects / Gallery
        if (/\b(works|work|project|projects|portfolio|design|designs|poster|posters|logo|logos|merch|merchandise|gallery|3d)\b/i.test(lower)) {
            return getWorksResponse();
        }

        // 5. Education / Internship / Experience
        if (/\b(where|saan|school|study|studied|university|qcu|education|intern|internship|ncmb|experience|jpcs|background)\b/i.test(lower)) {
            return getEducationResponse();
        }

        // 6. Roles / Hiring
        if (/\b(role|roles|hire|hiring|job|open|available|looking|position|freelance|commission)\b/i.test(lower)) {
            return getRolesResponse();
        }

        // 7. Bot Identity ("Sino ka?" / "Who are you?") — PRIORITIZED before profile
        if (/\b(sino ka|who are you|ano ka|what are you|yohan|bot|robot|assistant)\b/i.test(lower)) {
            return getIdentityResponse();
        }

        // 8. Who / Profile — Only matches specific phrases (not standalone who/sino)
        if (/\b(who is lance|sino si lance|about lance|profile|bio|introduce)\b/i.test(lower)) {
            return getProfileResponse();
        }

        // 9. Greetings & Kamustahan
        if (/\b(hi|hello|hey|yo|uy|musta|kamusta|kumusta|morning|afternoon|evening|umaga|hapon|gabi)\b/i.test(lower)) {
            return getGreetingResponse();
        }

        // 10. What Are You Doing / Ganap
        if (/\b(ginagawa|gawa|doing|wyd|busy|ganap)\b/i.test(lower)) {
            return getDoingResponse();
        }

        // 11. Compliments / Astig / Pogi
        if (/\b(pogi|gwapo|galing|astig|angas|nice|cool|idol|ganda|lupet|lupit|sheesh|solid)\b/i.test(lower)) {
            return getComplimentResponse();
        }

        // 12. Playful / Tropa Banter / Pang-asar
        if (/\b(bading|pangit|panget|loko|baliw|ulol|gago|tanga|bobo|kupal|hatdog|trip|uwi|ayoko|boring|crush|jowa|single|libre|utang|pera|gcash|ewan|ambot)\b/i.test(lower)) {
            return getPlayfulResponse();
        }

        // 13. Thank You / Goodbye
        if (/\b(thanks|thank|salamat|ty|bye|goodbye|paalam|babye|alis|out)\b/i.test(lower)) {
            return getThanksResponse();
        }

        // Fallback — Personal reply from Lance Harvey
        return getFallbackResponse();
    }

    // ============================================================
    // User Query Handler (from chips or input)
    // ============================================================
    function handleUserQuery(queryText) {
        if (!queryText || !queryText.trim()) return;
        const text = queryText.trim();

        // Append user message
        appendMessage(text, true);

        // Show typing indicator
        showTyping();

        // Simulate bot thinking delay
        setTimeout(() => {
            hideTyping();
            const response = getBotResponse(text);
            appendMessage(response.text, false, response.sender, response.isPersonal);
        }, 450);
    }

    // ============================================================
    // Chat Window Controls
    // ============================================================
    function openChat() {
        if (isOpen) return;
        isOpen = true;
        windowEl.classList.add('is-open');
        launcherWrapper.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.remove('is-expanded');
        launcherWrapper.classList.remove('is-expanded');
        if (expandTimer) clearTimeout(expandTimer);
        if (collapseTimer) clearTimeout(collapseTimer);
        input.focus();
    }

    function closeChat() {
        if (!isOpen) return;
        isOpen = false;
        windowEl.classList.remove('is-open');
        launcherWrapper.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        // Restart expand/collapse cycle when chat closes
        startExpandCycle();
    }

    function toggleChat() {
        if (isOpen) closeChat(); else openChat();
    }

    // ============================================================
    // Expand/Collapse Cycle: 10s expanded, 10s collapsed
    // ============================================================
    function startExpandCycle() {
        if (expandTimer) clearTimeout(expandTimer);
        if (collapseTimer) clearTimeout(collapseTimer);

        function doExpand() {
            if (isOpen) return;
            btn.classList.add('is-expanded');
            launcherWrapper.classList.add('is-expanded');
            collapseTimer = setTimeout(() => {
                if (isOpen) return;
                btn.classList.remove('is-expanded');
                launcherWrapper.classList.remove('is-expanded');
                expandTimer = setTimeout(doExpand, 10000);
            }, 10000);
        }

        // Start with collapsed, expand after 10s
        btn.classList.remove('is-expanded');
        launcherWrapper.classList.remove('is-expanded');
        expandTimer = setTimeout(doExpand, 10000);
    }

    // ============================================================
    // Navigation Helper: Close chat and scroll to section
    // ============================================================
    window.yohanNavigateTo = function(sectionSelector) {
        closeChat();
        const target = document.querySelector(sectionSelector);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // ============================================================
    // Header Expand/Compress Window Toggle
    // ============================================================
    function toggleExpandView() {
        windowEl.classList.toggle('is-expanded-view');
        const isExpanded = windowEl.classList.contains('is-expanded-view');
        expandBtn.setAttribute('aria-label', isExpanded ? 'Shrink chat' : 'Expand chat');
        expandBtn.setAttribute('title', isExpanded ? 'Shrink chat' : 'Expand chat');
        expandBtn.innerHTML = isExpanded
            ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>'
            : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
    }

    // ============================================================
    // Carousel Navigation (Left/Right Arrows)
    // ============================================================
    function scrollChips(direction) {
        const scrollAmount = 180;
        chipsTrack.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }

    // ============================================================
    // Mouse Wheel Horizontal Scroll on Chips Track
    // ============================================================
    chipsWrapper.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            chipsTrack.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // ============================================================
    // Initialization
    // ============================================================
    renderChips();

    // Pre-populate initial bot greeting
    appendMessage("Hi! I'm Yohan, Lance's AI Assistant. How can I help you today? Pick a question below or type your own!", false, 'Yohan');

    // Event Listeners
    btn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', closeChat);
    expandBtn.addEventListener('click', toggleExpandView);
    chipsPrevBtn.addEventListener('click', () => scrollChips(-1));
    chipsNextBtn.addEventListener('click', () => scrollChips(1));

    // Keyboard support for carousel nav buttons
    chipsPrevBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollChips(-1); }
    });
    chipsNextBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollChips(1); }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) closeChat();
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        handleUserQuery(text);
    });

    // Start expand/collapse cycle
    startExpandCycle();
})();