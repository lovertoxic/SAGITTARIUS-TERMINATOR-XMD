const fs = require('fs');
const path = require('path');

const SETTINGS_FILE = path.join(__dirname, '../settings.json');
let settingsCache = {}; // Cache to hold settings in memory

// Initialize settings from file or create if not exists
const loadSettings = () => {
    if (fs.existsSync(SETTINGS_FILE)) {
        try {
            settingsCache = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
            console.log("[SETTINGS] Settings loaded from file.");
            // Ensure ANTICALL exists if loaded from an old or empty file
            if (typeof settingsCache.ANTICALL === 'undefined') {
                settingsCache.ANTICALL = true; // Default to true if not found
                saveSettings();
            }
        } catch (e) {
            console.error("[SETTINGS ERROR] Failed to parse settings.json, creating a new one.", e);
            settingsCache = {
                "ANTICALL": true // Default value if file is corrupted
            };
            saveSettings();
        }
    } else {
        settingsCache = {
            "ANTICALL": true // Default settings if file doesn't exist
        };
        saveSettings();
        console.log("[SETTINGS] settings.json not found, created with default values.");
    }
};

const saveSettings = () => {
    try {
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settingsCache, null, 2), 'utf8');
        console.log("[SETTINGS] Settings saved to file.");
    } catch (e) {
        console.error("[SETTINGS ERROR] Failed to save settings.json", e);
    }
};

const getSetting = (key) => {
    return settingsCache[key];
};

const setSetting = (key, value) => {
    settingsCache[key] = value;
    saveSettings(); // Save immediately after setting
};

// Load settings when the module is required
loadSettings();

module.exports = {
    getSetting,
    setSetting,
    loadSettings // Export for potential manual refresh if needed
};
