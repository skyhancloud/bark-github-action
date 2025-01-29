import './sourcemap-register.cjs';/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

var __createBinding = (undefined && undefined.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (undefined && undefined.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (undefined && undefined.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const core = __importStar(require("@actions/core"));
const bark_js_1 = require("@thiskyhan/bark.js");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const serverUrl = core.getInput('server_url', { required: true });
        const deviceKey = core.getInput('device_key', { required: true });
        const client = new bark_js_1.BarkClient({
            baseUrl: serverUrl,
            key: deviceKey
        });
        const payload = {
            body: core.getInput('body', { required: true }),
            title: core.getInput('title'),
            subtitle: core.getInput('subtitle'),
            badge: parseInt(core.getInput('badge')) || 0,
            sound: core.getInput('sound'),
            group: core.getInput('group'),
            copy: core.getInput('copy')
        };
        const icon = core.getInput('icon');
        if (icon) {
            if (!icon.endsWith('.jpg'))
                core.setFailed('Icon must be a .jpg file');
            payload.icon = `${icon.split('.jpg')[0]}.jpg`;
        }
        const volume = parseInt(core.getInput('volume'));
        if (volume) {
            if (isNaN(volume))
                core.setFailed('Volume must be a number');
            if (volume < 0 || volume > 10)
                core.setFailed('Volume must be between 0 and 10');
            payload.volume = volume;
        }
        const level = core.getInput('level');
        if (level) {
            if (!['critical', 'active', 'timeSensitive', 'passive'].includes(level))
                core.setFailed('Level must be one of critical, active, timeSensitive, passive');
            payload.level = level;
        }
        const url = core.getInput('url');
        if (url) {
            try {
                new URL(url);
                payload.url = url;
            }
            catch (_a) {
                core.setFailed('Invalid URL');
            }
        }
        const isArchive = core.getInput('is_archive');
        if (isArchive) {
            if (isArchive !== 'true' && isArchive !== 'false')
                core.setFailed('is_archive must be a boolean');
        }
        const autoCopy = core.getInput('auto_copy');
        if (autoCopy) {
            if (autoCopy !== 'true' && autoCopy !== 'false')
                core.setFailed('auto_copy must be a boolean');
        }
        const call = core.getInput('call');
        if (call) {
            if (call !== 'true' && call !== 'false')
                core.setFailed('call must be a boolean');
        }
        const action = core.getInput('action');
        if (action) {
            if (action !== 'none')
                core.setFailed('action must be none');
        }
        const response = yield client.pushMessage(payload);
        core.info(`Response code: ${response.code}`);
        core.info(`Response message: ${response.message}`);
        if (response.code !== 200) {
            core.setFailed('Failed to send notification');
        }
        else {
            core.info('Notification sent successfully');
        }
        core.setOutput('response_code', response.code);
        core.setOutput('response_message', response.message);
        core.setOutput('response_timestamp', response.timestamp);
        core.info('Action completed');
    });
}
void run();


//# sourceMappingURL=index.js.map