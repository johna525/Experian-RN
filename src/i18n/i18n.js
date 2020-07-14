import { AsyncStorage } from 'react-native';
import I18n from 'react-native-i18n';
import en from './locales/en';
import fr from './locales/fr';
import es from './locales/es';

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
  es
};

const setUserLocale = async () => {
  try {
    const value = await AsyncStorage.getItem('locale');
    if (value !== null) {
      // We have data!!
      console.log(value);
      I18n.locale = value;
    } else {
      I18n.locale = 'en';
    }
  } catch (error) {
    // Error retrieving data
  }
};

setUserLocale();

export default I18n;
