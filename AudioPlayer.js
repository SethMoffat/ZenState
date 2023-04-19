import { Audio } from 'expo-av';

class AudioPlayer {
  constructor() {
    this.sound = null;
  }

  async playAudio(uri) {
    if (this.sound) {
      await this.sound.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync({ uri });
    this.sound = sound;
    await this.sound.playAsync();
  }

  async unloadAudio() {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
    }
  }
}

export default new AudioPlayer();