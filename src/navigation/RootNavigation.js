import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import WelcomeScreen from '../containers/Welcome';
import LoginScreen from '../containers/Auth/login';
import SignUpScreen from '../containers/Auth/register';
import ResetPasswordScreen from '../containers/Auth/reset_password';
import CreatePinScreen from '../containers/Auth/create_pin';
import ConfirmPinScreen from '../containers/Auth/confirm_pin';
import TouchEnableScreen from '../containers/Auth/touch_enable';
import GetStartScreen from '../containers/GetStart';
import HomeScreen from '../containers/HomeStack';
import HelpScreen from '../containers/HelpStack';
import AccountScreen from '../containers/AccountStack';
import NotificationScreen from '../containers/NotificationStack';
import NotificationDetail from '../containers/NotificationStack/notification_detail';
import TabView from '../components/TabView';
import { colors } from '../theme/colors';
import HomeSearchScreen from '../containers/HomeStack/search';
import FileTypesScreen from '../containers/HomeStack/search/file_types';
import AllCollection from '../containers/HomeStack/collections';
import CollectionDetail from '../containers/HomeStack/collections/collection_detail';
import PropositionsScreen from '../containers/HomeStack/propositions';
import ExperiansScreen from '../containers/HomeStack/experian';
import ExperianDetail from '../containers/HomeStack/experian/experian_detail';
import PropositionDetail from '../containers/HomeStack/propositions/proposition_detail';
import PersonalDetailScreen from '../containers/AccountStack/personal_detail';
import RegionLanguageScreen from '../containers/AccountStack/region_language';
import AccountSettingScreen from '../containers/AccountStack/settings';
import AccountNotificationScreen from '../containers/AccountStack/notifications';
import FAQScreen from '../containers/HelpStack/faqs';
import FAQDetailScreen from '../containers/HelpStack/faq_detail';
import LeaveFeedbackScreen from '../containers/HelpStack/feedback';
import I18n from '../i18n/i18n';

const HomeStack = createStackNavigator(
  {
    HOME: HomeScreen,
    HOME_SEARCH: HomeSearchScreen,
    HOME_FILE_TYPES: FileTypesScreen,
    ALL_COLLECTIONS: AllCollection,
    COLLECTION_DETAIL: CollectionDetail,
    ALL_PROPOSITIONS: PropositionsScreen,
    ALL_EXPERIANS: ExperiansScreen,
    EXPERIAN_DETAIL: ExperianDetail,
    PROPOSITION_DETAIL: PropositionDetail
  },
  {
    headerMode: 'none',
  }
);
const HelpStack = createStackNavigator(
  {
    HELP: HelpScreen,
    HELP_FAQ: FAQScreen,
    HELP_FAQ_DETAIL: FAQDetailScreen,
    HELP_FEEDBACK: LeaveFeedbackScreen
  },
  {
    headerMode: 'none',
  }
);
const AccountStack = createStackNavigator(
  {
    ACCOUNT: AccountScreen,
    ACCOUNT_PERSONAL_DETAIL: PersonalDetailScreen,
    ACCOUNT_REGION_LANGUAGE: RegionLanguageScreen,
    ACCOUNT_SETTINGS: AccountSettingScreen,
    ACCOUNT_NOTIFICATIONS: AccountNotificationScreen
  },
  {
    headerMode: 'none',
  }
);
const NotificationStack = createStackNavigator(
  {
    NOTIFICATION: NotificationScreen,
    NOTIFICATION_DETAIL: NotificationDetail
  },
  {
    headerMode: 'none',
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Help: HelpStack,
    Account: AccountStack,
    Notifications: NotificationStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let title;
        if (routeName === 'Home') {
          title = I18n.t('tab_home');
        } else if (routeName === 'Help') {
          title = I18n.t('tab_help');
        } else if (routeName === 'Account') {
          title = I18n.t('tab_account');
        } else if (routeName === 'Notifications') {
          title = I18n.t('tab_notification');
        }
        return (
          <TabView title={title} focused={focused} routeName={routeName} />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.blue,
      inactiveTintColor: colors.text,
      showLabel: false
    },
  }
);

const AppStack = createStackNavigator(
  {
    WELCOME: WelcomeScreen,
    LOGIN: LoginScreen,
    REGISTER: SignUpScreen,
    RESET_PASSWORD: ResetPasswordScreen,
    CREATE_PIN: CreatePinScreen,
    CONFIRM_PIN: ConfirmPinScreen,
    TOUCH_ENABLE: TouchEnableScreen,
    GET_START: GetStartScreen,
    MAIN_SCREEN: TabNavigator
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(AppStack);
