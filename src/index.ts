import * as core from '@actions/core';
import { BarkClient, BarkPushPayload, BarkSounds } from '@thiskyhan/bark.js';

export async function run(): Promise<void> {
  const serverUrl = core.getInput('server_url', { required: true });
  const deviceKey = core.getInput('device_key', { required: true });

  const client = new BarkClient({
    baseUrl: serverUrl,
    key: deviceKey
  });

  const payload: BarkPushPayload = {
    body: core.getInput('body', { required: true }),
    title: core.getInput('title'),
    subtitle: core.getInput('subtitle'),
    badge: parseInt(core.getInput('badge')) || 0,
    sound: core.getInput('sound') as BarkSounds,
    group: core.getInput('group'),
    copy: core.getInput('copy')
  };

  const icon = core.getInput('icon');
  if (icon) {
    if (!icon.endsWith('.jpg')) core.setFailed('Icon must be a .jpg file');

    payload.icon = `${icon.split('.jpg')[0]}.jpg`;
  }

  const volume = parseInt(core.getInput('volume'));
  if (volume) {
    if (isNaN(volume)) core.setFailed('Volume must be a number');
    if (volume < 0 || volume > 10) core.setFailed('Volume must be between 0 and 10');

    payload.volume = volume as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  }

  const level = core.getInput('level');
  if (level) {
    if (!['critical', 'active', 'timeSensitive', 'passive'].includes(level)) core.setFailed('Level must be one of critical, active, timeSensitive, passive');

    payload.level = level as 'critical' | 'active' | 'timeSensitive' | 'passive';
  }

  const url = core.getInput('url');
  if (url) {
    try {
      new URL(url);

      payload.url = url;
    } catch {
      core.setFailed('Invalid URL');
    }
  }

  const isArchive = core.getInput('is_archive');
  if (isArchive) {
    if (isArchive !== 'true' && isArchive !== 'false') core.setFailed('is_archive must be a boolean');
  }

  const autoCopy = core.getInput('auto_copy');
  if (autoCopy) {
    if (autoCopy !== 'true' && autoCopy !== 'false') core.setFailed('auto_copy must be a boolean');
  }

  const call = core.getInput('call');
  if (call) {
    if (call !== 'true' && call !== 'false') core.setFailed('call must be a boolean');
  }

  const action = core.getInput('action');
  if (action) {
    if (action !== 'none') core.setFailed('action must be none');
  }

  const response = await client.pushMessage(payload);

  core.info(`Response code: ${response.code}`);
  core.info(`Response message: ${response.message}`);

  if (response.code !== 200) {
    core.setFailed('Failed to send notification');
  } else {
    core.info('Notification sent successfully');
  }

  core.setOutput('response_code', response.code);
  core.setOutput('response_message', response.message);
  core.setOutput('response_timestamp', response.timestamp);

  core.info('Action completed');
}

void run();