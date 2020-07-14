const common = {
  login: 'Se connecter',
  register: "S'inscrire",
  signin: 'Se connecter',
  email: 'Email',
  password: 'Mot de passe',
  cancel: 'Annuler',
  confirm: 'Confirmer',
  done: 'Terminé',
  back: 'Retour',
  create: 'Créer',
  enable: 'Activer',
  no_results: 'Aucun résultat',
};

const welcome = {
  welcome_1_title_1: 'Bienvenue à',
  welcome_1_title_2: 'La source',
  welcome_1_sub_1: 'Les ressources dont vous avez besoin,',
  welcome_1_sub_2: 'Tout en un',
  welcome_2_title_1: 'Bienvenue',
  welcome_2_title_2: 'Pour Voyager',
  welcome_2_sub_1: 'Toutes les ressources dont vous avez besoin',
  welcome_2_sub_2: 'pour planifier le parcours de votre client',
  welcome_3_title: 'Salut, je suis Alfred',
  welcome_3_sub_1: 'Je peux aider avec tous vos',
  welcome_3_sub_2: 'Besoins de vente'
};

const login = {
  forgot_password: 'Mot de passe oublié?',
  signing: 'Connectez-vous...',
  email_required: 'Email est requis',
  email_invalid: 'Le courriel est invalide',
  password_required: 'Mot de passe requis',
  logout_detail: "Vous avez été déconnecté en raison d'une inactivité de 30 minutes."
};

const register = {
  register: 'registre',
  fullname: 'Nom complet',
  country: "Pays d'origine",
  language: 'Langue préférée',
  fullname_required: 'Le nom complet est requis',
  email_required: 'Email est requis',
  email_invalid: 'Le courriel est invalide',
  password_length: 'Le mot de passe devrait être plus de 8 en longueur',
  country_list: [
    {
      label: 'France',
      value: 'France'
    },
    {
      label: 'allemand',
      value: 'Germany'
    },
    {
      label: 'Espagne',
      value: 'Spain'
    },
    {
      label: 'Royaume-Uni',
      value: 'United Kingdom'
    },
  ],
  language_list: [
    {
      label: 'Anglais',
      value: 'en'
    },
    {
      label: 'Espanol',
      value: 'es'
    },
    {
      label: 'français',
      value: 'fr'
    },
  ]
};

const pin = {
  create_pin: 'Créez un code PIN à six chiffres pour pouvoir vous connecter rapidement et facilement.',
  confirm_pin: 'Confirmez votre PI à six chiffres',
  pin_not_match: 'Le code PIN de confirmation est incorrects!'
};

const touchID = {
  enable_touch_id: 'Activer Touch ID',
  touch_id_description: 'Connectez-vous rapidement et facilement en utilisant votre empreinte digitale.',
  touch_id_no_thanks: 'Non merci, je vais utiliser mon code PIN',
  signing_up: "S'enregistrer..."
};

const resetPassword = {
  reset_password: 'Réinitialiser le mot de passe',
  email_address: 'Adresse électronique',
  reset_email_sent: "Réinitialiser l'email a été envoyé"
};

const getStarted = {
  title_1: 'Comment ça marche',
  description_1_1: "Il existe une mine d'informations et de matériaux pour vous aider tout au long du processus de vente. Mais serait-ce plus facile si tout était réuni au même endroit?",
  description_1_2: "Nous avons rassemblé les informations les plus récentes et les plus pertinentes sur la vente et la formation de l'ensemble du secteur, afin que vous puissiez accéder rapidement à ce dont vous avez besoin, au moment opportun.",
  description_1_3: "Ainsi, que vous recherchiez une mise à jour rapide de l'une de nos propositions, une vidéo ou une présentation à partager avec un client, ou pour comprendre quelle formation vous est proposée, vous pouvez la trouver sur (ou via) The Source.",
  title_2_1: 'Accès facile au',
  title_2_2: 'bout des doigts',
  description_2_1: "Toutes les informations dont vous avez besoin sont accessibles directement depuis l'application ou via un lien vers l'un des autres portails. Ainsi, vous ne verrez peut-être pas tout ce que vous avez l'habitude de voir sur l'application, mais il vous suffira d'un clic pour trouver le fichier PDF, PowerPoint ou la vidéo que vous recherchez.",
  sub_title_2: 'Accès au fichier externe',
  description_2_2: "L'application utilise la fonctionnalité Okta Single Sign On pour se connecter aux systèmes internes d'Experian tels que Cornerstone et Seismic.",
  description_2_3: "Le contenu est principalement hébergé dans l'application, mais pour une lecture étendue sur d'autres plateformes, vous pouvez être dirigé hors de l'application vers une vue non native de la copie pertinente et nécessiter une authentification supplémentaire.",
  title_3: 'Garder à jour',
  description_3_1: 'Souhaitez-vous recevoir des notifications de notre part? Nous pouvons vous envoyer un message sur:',
  sub_title_3_1: "Mises à jour de l'application",
  sub_title_3_2: 'Mises à jour de la proposition',
  sub_title_3_3: 'Mises à jour marketing',
  sub_title_3_4: "Messages d'affaires généraux",
  sub_title_3_5: 'Ne plus montrer ça',
  get_started: 'Commencer',
  prev: 'Prev',
  next: 'Suivant'
};

const tabview = {
  tab_home: 'Accueil',
  tab_help: 'Aidez-moi',
  tab_account: 'Compte',
  tab_notification: 'Les notifications'
};

const homeStack = {
  good_morning: 'Bonjour',
  good_afternoon: 'Bonne après-midi',
  good_evening: 'Bonsoir',
  search_placeholder: 'Demander le kit',
  proposition_button: 'Voir nos propositions',
  collections: 'Actifs de vente',
  view_all: 'Voir tout',
  about_experian: "A propos d'Experian",
  filter_by: 'Filtrer par:',
  all: 'Tout',
  information_type: "Type d'information",
  file_type: 'Type de fichier',
  propositions: 'Propositions',
  collections_title: 'Voir nos collections de documents',
  demos: 'Démos',
  playbooks: 'Playbooks',
  sales_presentation: 'Présentation de vente',
  case_studies: 'Études de cas',
  brochures: 'Des brochures',
  training: 'Entraînement',
  sort_by: 'Trier par:',
  overview: "Vue d'ensemble",
  how_it_works: 'Comment ça marche',
  quick_links: 'Liens rapides'
};

const helpStack = {
  useful_links: 'Liens utiles',
  faqs: 'FAQ',
  tac: 'Termes et conditions',
  pp: 'Politique de confidentialité',
  leave_feedback: 'Laisser un commentaire',
  contact_us: 'Nous contacter',
  email_us: 'Email nous',
  app_faqs: 'FAQ sur les applications',
  content_faqs: 'FAQ sur le contenu',
  feedback_description: 'Dites-nous ce que vous pensez...',
  send_message: 'Envoyer un message',
  topic_empty: 'Veuillez choisir un sujet',
  feedback_message_length: 'Les commentaires devraient être plus de 20 en longueur',
};

const accountStack = {
  personal_details: 'Détails personnels',
  change_region_language: 'Changer de région / langue',
  settings: 'Réglages',
  logout: 'Connectez - Out',
  title: 'Titre',
  name: 'prénom',
  surname: 'Nom de famille',
  phone_number: 'Numéro de téléphone',
  job_title: 'Profession',
  region_list: [
    {
      label: "L'Europe",
      value: 'Europe',
    },
    {
      label: 'Asie',
      value: 'Asia',
    },
    {
      label: 'Afrique',
      value: 'Africa',
    },
    {
      label: 'Amérique du Nord',
      value: 'North America',
    },
    {
      label: 'Amérique du sud',
      value: 'South America',
    },
  ],
  current_region: 'Région actuelle',
  current_language: 'Langue courante',
  enable_location: 'Location disponible',
  use_touch_id: 'Utiliser le Touch ID',
  change_pin: 'Changer mon code PIN',
  select_avatar: 'Sélectionnez un avatar',
  photo_from_facebook: 'Choisissez une photo de Facebook',
  save_details: 'Enregistrer les détails',
  saved: 'enregistré avec succès!'
};

const notificationStack = {
  favourites: 'Favoris',
  select: 'Sélectionner',
  delete_selected: 'Supprimer sélectionnée',
  delete_all: 'Supprimer tout',
  selected: 'Choisi',
  notification_empty: 'Vous êtes tous rattrapés.',
  favourites_empty: 'Pas de favoris',
  posted_on: 'Posté sur'
};

export default {
  ...common,
  ...welcome,
  ...login,
  ...register,
  ...pin,
  ...touchID,
  ...resetPassword,
  ...getStarted,
  ...tabview,
  ...homeStack,
  ...helpStack,
  ...accountStack,
  ...notificationStack
};
