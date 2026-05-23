 

const continueBtn = document.querySelector(".continue-btn");
const emailInput  = document.getElementById("email");

//  Error Display  

function showError(message) {
  let errEl = document.getElementById("signin-error");
  if (!errEl) {
    errEl = document.createElement("div");
    errEl.id = "signin-error";
    errEl.style.cssText = `
      background: #fff3cd;
      border: 1px solid #f0a500;
      border-radius: 6px;
      padding: 10px 14px;
      font-size: 0.85rem;
      color: #0c1b33;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    emailInput.parentElement.insertAdjacentElement("afterend", errEl);
  }
  errEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:#f0a500;"></i> ${message}`;
  errEl.style.display = "flex";
  emailInput.style.borderColor = "#f0a500";
  emailInput.style.boxShadow = "0 0 5px rgba(240,165,0,0.4)";
}

function clearError() {
  const errEl = document.getElementById("signin-error");
  if (errEl) errEl.style.display = "none";
  if (emailInput) {
    emailInput.style.borderColor = "";
    emailInput.style.boxShadow = "";
  }
}

function isValidEmailOrPhone(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  return emailRegex.test(value) || phoneRegex.test(value);
}

// ─── Password Step (shown after email validation) ─────────────────────────────

let currentEmail = "";

function showPasswordStep(email) {
  currentEmail = email;

  const signinBox = document.querySelector(".signin-box");
  signinBox.innerHTML = `
    <h1>Sign in</h1>

    <div style="
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.9rem;
    ">
      <span>${email}</span>
      <a href="sign-in page.html" style="font-size:0.8rem; color:#0066c0; text-decoration:none;">Change</a>
    </div>

    <div class="input-group">
      <label for="password">Password</label>
      <div style="position:relative;">
        <input type="password" id="password" name="password" required
          style="width:100%; padding:10px; border:1px solid #a6a6a6;
          border-radius:4px; font-size:1rem; box-sizing:border-box;">
        <span id="toggle-pwd" style="
          position:absolute; right:10px; top:50%; transform:translateY(-50%);
          cursor:pointer; color:#0066c0; font-size:0.8rem; user-select:none;
        ">Show</span>
      </div>
    </div>

    <div id="pw-error"></div>

    <button id="signin-submit-btn" style="
      width:100%; background:#f0a500; border:1px solid #a88734;
      padding:10px; border-radius:8px; font-size:0.95rem;
      font-weight:bold; cursor:pointer; color:#0c1b33; margin-top:12px;
    ">Sign In</button>

    <p class="legal-text" style="margin-top:14px;">
      By signing in, you agree to Arrow's
      <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
    </p>
    <div class="help-section" style="margin-top:10px;">
      <a href="#"><i class="fa-solid fa-caret-right"></i> Forgot your password?</a>
    </div>
  `;

  // Password toggle
  document.getElementById("toggle-pwd").addEventListener("click", function () {
    const pwdInput = document.getElementById("password");
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      this.textContent = "Hide";
    } else {
      pwdInput.type = "password";
      this.textContent = "Show";
    }
  });

  // Submit
  document.getElementById("signin-submit-btn").addEventListener("click", handleSignIn);
  document.getElementById("password").addEventListener("keydown", e => {
    if (e.key === "Enter") handleSignIn();
  });

  document.getElementById("password").focus();
}

function handleSignIn() {
  const pwdInput = document.getElementById("password");
  const errEl   = document.getElementById("pw-error");
  const password = pwdInput.value;

  if (!password) {
    errEl.innerHTML = `<div style="background:#fff3cd; border:1px solid #f0a500; border-radius:6px;
      padding:10px 14px; font-size:0.85rem; color:#0c1b33; margin-bottom:12px; display:flex; gap:8px; align-items:center;">
      <i class="fa-solid fa-triangle-exclamation" style="color:#f0a500;"></i>
      Enter your password.
    </div>`;
    pwdInput.focus();
    return;
  }

  // Look up registered users
  const users = JSON.parse(localStorage.getItem("arrowUsers") || "{}");
  const storedPwd = users[currentEmail]?.password;

  if (!storedPwd) {
    errEl.innerHTML = `<div style="background:#fff3cd; border:1px solid #f0a500; border-radius:6px;
      padding:10px 14px; font-size:0.85rem; color:#0c1b33; margin-bottom:12px; display:flex; gap:8px; align-items:center;">
      <i class="fa-solid fa-triangle-exclamation" style="color:#f0a500;"></i>
      No account found for this email. Please <a href="#" onclick="document.querySelector('.create-account-btn').click(); return false;" style="color:#0066c0;">create an account</a>.
    </div>`;
    return;
  }

  if (storedPwd !== password) {
    errEl.innerHTML = `<div style="background:#fff3cd; border:1px solid #f0a500; border-radius:6px;
      padding:10px 14px; font-size:0.85rem; color:#0c1b33; margin-bottom:12px; display:flex; gap:8px; align-items:center;">
      <i class="fa-solid fa-triangle-exclamation" style="color:#f0a500;"></i>
      Incorrect password. Please try again.
    </div>`;
    pwdInput.value = "";
    pwdInput.focus();
    return;
  }

  // Success
  localStorage.setItem("arrowUser", currentEmail);
  if (users[currentEmail]?.name) {
    localStorage.setItem("arrowUserName", users[currentEmail].name);
  }

  const btn = document.getElementById("signin-submit-btn");
  btn.textContent = "Signing in...";
  btn.disabled = true;
  btn.style.opacity = "0.8";
  setTimeout(() => {
    window.location.href = "Arrow.html";
  }, 800);
}

// ─── Continue button (email step) ────────────────────────────────────────────

if (continueBtn && emailInput) {
  continueBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clearError();

    const value = emailInput.value.trim();
    if (!value) {
      showError("Enter your email or mobile phone number.");
      emailInput.focus();
      return;
    }
    if (!isValidEmailOrPhone(value)) {
      showError("Please enter a valid email address or 10-digit mobile number.");
      emailInput.focus();
      return;
    }

    continueBtn.textContent = "Continuing...";
    continueBtn.disabled = true;
    setTimeout(() => {
      showPasswordStep(value);
    }, 400);
  });

  emailInput.addEventListener("input", clearError);
  emailInput.addEventListener("keydown", e => {
    if (e.key === "Enter") continueBtn.click();
  });
}

// ─── Register Modal ───────────────────────────────────────────────────────────

function showRegisterModal() {
  const existing = document.getElementById("register-modal");
  if (existing) { existing.style.display = "flex"; return; }

  const modal = document.createElement("div");
  modal.id = "register-modal";
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  modal.innerHTML = `
    <div style="
      background: #fff;
      border-radius: 12px;
      padding: 32px;
      width: 400px;
      max-width: 95vw;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      position: relative;
    ">
      <button id="modal-close" style="
        position:absolute; top:12px; right:16px;
        background:none; border:none; font-size:1.3rem;
        cursor:pointer; color:#555; line-height:1;
      ">✕</button>

      <h2 style="font-size:1.5rem; font-weight:400; color:#0c1b33; margin-bottom:6px;">Create Account</h2>
      <p style="font-size:0.8rem; color:#666; margin-bottom:20px;">Join Arrow for the best shopping experience</p>

      <div id="reg-error" style="margin-bottom:10px;"></div>

      <div style="margin-bottom:14px;">
        <label style="font-size:0.85rem; font-weight:bold; display:block; margin-bottom:5px;">Your name</label>
        <input id="reg-name" type="text" placeholder="First and last name" style="
          width:100%; padding:10px; border:1px solid #a6a6a6;
          border-radius:4px; font-size:1rem; box-sizing:border-box;">
      </div>

      <div style="margin-bottom:14px;">
        <label style="font-size:0.85rem; font-weight:bold; display:block; margin-bottom:5px;">Email</label>
        <input id="reg-email" type="email" placeholder="you@example.com" style="
          width:100%; padding:10px; border:1px solid #a6a6a6;
          border-radius:4px; font-size:1rem; box-sizing:border-box;">
      </div>

      <div style="margin-bottom:14px;">
        <label style="font-size:0.85rem; font-weight:bold; display:block; margin-bottom:5px;">Password</label>
        <div style="position:relative;">
          <input id="reg-password" type="password" placeholder="At least 6 characters" style="
            width:100%; padding:10px; border:1px solid #a6a6a6;
            border-radius:4px; font-size:1rem; box-sizing:border-box;">
          <span id="reg-toggle-pwd" style="
            position:absolute; right:10px; top:50%; transform:translateY(-50%);
            cursor:pointer; color:#0066c0; font-size:0.8rem; user-select:none;">Show</span>
        </div>
        <div id="pwd-strength" style="margin-top:4px; font-size:0.75rem; color:#888;"></div>
      </div>

      <div style="margin-bottom:20px;">
        <label style="font-size:0.85rem; font-weight:bold; display:block; margin-bottom:5px;">Re-enter password</label>
        <input id="reg-confirm" type="password" placeholder="Confirm your password" style="
          width:100%; padding:10px; border:1px solid #a6a6a6;
          border-radius:4px; font-size:1rem; box-sizing:border-box;">
      </div>

      <button id="reg-submit" style="
        width:100%; background:#f0a500; border:1px solid #a88734;
        padding:10px; border-radius:8px; font-size:0.95rem;
        font-weight:bold; cursor:pointer; color:#0c1b33;
        transition: background 0.2s;
      ">Create your Arrow account</button>

      <p style="font-size:0.75rem; color:#555; margin-top:14px; line-height:1.5;">
        By creating an account, you agree to Arrow's
        <a href="#" style="color:#0066c0;">Conditions of Use</a> and
        <a href="#" style="color:#0066c0;">Privacy Notice</a>.
      </p>

      <p style="text-align:center; margin-top:14px; font-size:0.85rem;">
        Already have an account?
        <a href="sign-in page.html" style="color:#0066c0; text-decoration:none;">Sign in</a>
      </p>
    </div>
  `;

  document.body.appendChild(modal);

  // Close
  document.getElementById("modal-close").addEventListener("click", () => {
    modal.style.display = "none";
  });
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Password toggle
  document.getElementById("reg-toggle-pwd").addEventListener("click", function () {
    const p = document.getElementById("reg-password");
    if (p.type === "password") { p.type = "text"; this.textContent = "Hide"; }
    else { p.type = "password"; this.textContent = "Show"; }
  });

  // Password strength
  document.getElementById("reg-password").addEventListener("input", function () {
    const val = this.value;
    const el = document.getElementById("pwd-strength");
    if (!val) { el.textContent = ""; return; }
    if (val.length < 6) {
      el.innerHTML = `<span style="color:#c0392b;">Weak — at least 6 characters needed</span>`;
    } else if (val.length < 10 || !/[0-9]/.test(val)) {
      el.innerHTML = `<span style="color:#e67e22;">Medium — add numbers for strength</span>`;
    } else {
      el.innerHTML = `<span style="color:#27ae60;">Strong ✓</span>`;
    }
  });

  // Submit
  document.getElementById("reg-submit").addEventListener("click", () => {
    const name     = document.getElementById("reg-name").value.trim();
    const email    = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirm  = document.getElementById("reg-confirm").value;
    const errEl    = document.getElementById("reg-error");

    const showRegError = (msg) => {
      errEl.innerHTML = `<div style="background:#fff3cd; border:1px solid #f0a500; border-radius:6px;
        padding:10px 14px; font-size:0.85rem; color:#0c1b33; margin-bottom:12px; display:flex; gap:8px; align-items:center;">
        <i class="fa-solid fa-triangle-exclamation" style="color:#f0a500;"></i>${msg}
      </div>`;
    };

    if (!name || !email || !password || !confirm) {
      showRegError("Please fill in all fields."); return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showRegError("Please enter a valid email address."); return;
    }
    if (password.length < 6) {
      showRegError("Password must be at least 6 characters."); return;
    }
    if (password !== confirm) {
      showRegError("Passwords do not match."); return;
    }

    // Check if already registered
    const users = JSON.parse(localStorage.getItem("arrowUsers") || "{}");
    if (users[email]) {
      showRegError(`An account with this email already exists. <a href="sign-in page.html" style="color:#0066c0;">Sign in instead</a>.`);
      return;
    }

    // Save user
    users[email] = { name, password };
    localStorage.setItem("arrowUsers", JSON.stringify(users));
    localStorage.setItem("arrowUser", email);
    localStorage.setItem("arrowUserName", name);

    // Success feedback
    const btn = document.getElementById("reg-submit");
    btn.textContent = "Account created! Redirecting...";
    btn.style.background = "#88c540";
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = "Arrow.html";
    }, 1000);
  });
}

// ─── Bind Create Account Button ───────────────────────────────────────────────

const createBtn = document.querySelector(".create-account-btn");
if (createBtn) {
  createBtn.addEventListener("click", () => showRegisterModal());
}

// ─── Redirect if Already Signed In ───────────────────────────────────────────

(function () {
  const savedUser = localStorage.getItem("arrowUser");
  if (savedUser && emailInput) {
    emailInput.value = savedUser;
  }
})();

// ─── Search bar on sign-in page ───────────────────────────────────────────────

const searchInput  = document.getElementById("searchInput");
const searchIconEl = document.querySelector(".search-icon");

if (searchInput) {
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const q = encodeURIComponent(this.value.trim());
      if (q) window.location.href = `https://www.amazon.in/s?k=${q}`;
    }
  });
}
if (searchIconEl && searchInput) {
  searchIconEl.addEventListener("click", () => {
    const q = encodeURIComponent(searchInput.value.trim());
    if (q) window.location.href = `https://www.amazon.in/s?k=${q}`;
  });
}