import {
  IconAdjustmentsHorizontal,
  IconAlertCircle,
  IconAlertTriangle,
  IconArrowRight,
  IconBell,
  IconBold,
  IconBox,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrightness,
  IconCalendar,
  IconCheck,
  IconChecks,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconChevronsDown,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircle,
  IconCircleCheck,
  IconCirclePlus,
  IconCircleX,
  IconClipboardText,
  IconClock,
  IconCode,
  IconCommand,
  IconCreditCard,
  IconDeviceLaptop,
  IconDots,
  IconDotsVertical,
  IconEdit,
  IconExternalLink,
  IconEyeOff,
  IconFile,
  IconFileText,
  IconFileTypePdf,
  IconFileTypeDoc,
  IconFileTypeXls,
  IconFileZip,
  IconFolder,
  IconGripVertical,
  IconHelpCircle,
  IconInfoCircle,
  IconItalic,
  IconLayoutDashboard,
  IconLayoutKanban,
  IconLayoutSidebar,
  IconLoader2,
  IconLock,
  IconLogin,
  IconLogout,
  IconMessage,
  IconMinus,
  IconMoon,
  IconMusic,
  IconPalette,
  IconPaperclip,
  IconPhone,
  IconPhoto,
  IconPizza,
  IconPlus,
  IconProps,
  IconRosetteDiscountCheck,
  IconSearch,
  IconSelector,
  IconSend,
  IconSettings,
  IconShare,
  IconSlash,
  IconSparkles,
  IconStack2,
  IconStar,
  IconSun,
  IconTrash,
  IconTrendingDown,
  IconTrendingUp,
  IconTypography,
  IconUnderline,
  IconUpload,
  IconUser,
  IconUserCircle,
  IconUserEdit,
  IconUserX,
  IconUsers,
  IconVideo,
  IconCrown,
  IconStethoscope,
  IconPill,
  IconReportMedical,
  IconCalendarHeart,
  IconActivity,
  IconX
} from '@tabler/icons-react';
import * as React from 'react';

export type Icon = React.ComponentType<IconProps>;

/**
 * Lumen Health brand mark — a light bulb outline with the familiar
 * heart-and-heartbeat-line graphic sitting inside the dome. Kept in the
 * same Tabler outline style (24x24, stroke-only, currentColor) so it
 * inherits the surrounding text color and accepts the same className /
 * strokeWidth / size props as any Tabler icon.
 */
function IconLumenLogo({ size = 24, stroke = 2, ...props }: IconProps & { stroke?: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={stroke}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      {/* Light bulb body — dome + three screw-thread lines */}
      <path d='M8.5 18a7 7 0 1 1 7 0' />
      <path d='M9 18h6' />
      <path d='M9.5 19.5h5' />
      <path d='M10 21h4' />
      {/* Tabler IconHeartbeat (heart + EKG line) shifted down so it sits
          centred in the bulb dome (was rendering near the top). */}
      <g transform='translate(7 6.5) scale(0.42)' vectorEffect='non-scaling-stroke'>
        <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
        <path d='M3 13h2l2 -2l4 4l2 -2l3 3h5' />
      </g>
    </svg>
  );
}

export const Icons = {
  // General
  alertCircle: IconAlertCircle,
  warning: IconAlertTriangle,
  arrowRight: IconArrowRight,
  check: IconCheck,
  checks: IconChecks,
  circleCheck: IconCircleCheck,
  close: IconX,
  clock: IconClock,
  code: IconCode,
  dots: IconDots,
  ellipsis: IconDotsVertical,
  externalLink: IconExternalLink,
  help: IconHelpCircle,
  info: IconInfoCircle,
  spinner: IconLoader2,
  search: IconSearch,
  settings: IconSettings,
  trash: IconTrash,

  // Navigation / Chevrons
  chevronDown: IconChevronDown,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  chevronUp: IconChevronUp,
  chevronsDown: IconChevronsDown,
  chevronsLeft: IconChevronsLeft,
  chevronsRight: IconChevronsRight,
  chevronsUpDown: IconSelector,

  // Layout
  dashboard: IconLayoutDashboard,
  kanban: IconLayoutKanban,
  panelLeft: IconLayoutSidebar,

  // User
  user: IconUser,
  user2: IconUserCircle,
  account: IconUserCircle,
  profile: IconUser,
  employee: IconUserX,
  userPen: IconUserEdit,
  teams: IconUsers,

  // Brand
  github: IconBrandGithub,
  twitter: IconBrandTwitter,
  logo: IconCommand,

  // Communication
  chat: IconMessage,
  notification: IconBell,
  phone: IconPhone,
  video: IconVideo,
  send: IconSend,
  paperclip: IconPaperclip,

  // Files
  page: IconFile,
  post: IconFileText,
  fileTypePdf: IconFileTypePdf,
  fileTypeDoc: IconFileTypeDoc,
  fileTypeXls: IconFileTypeXls,
  fileZip: IconFileZip,
  media: IconPhoto,
  music: IconMusic,

  // Actions
  add: IconPlus,
  edit: IconEdit,
  upload: IconUpload,
  share: IconShare,
  login: IconLogin,
  logout: IconLogout,
  gripVertical: IconGripVertical,

  // Shapes / Indicators
  circle: IconCircle,
  circleX: IconCircleX,
  plusCircle: IconCirclePlus,
  xCircle: IconCircleX,
  minus: IconMinus,

  // Theme
  sun: IconSun,
  moon: IconMoon,
  brightness: IconBrightness,
  laptop: IconDeviceLaptop,
  palette: IconPalette,

  // Commerce / Plans
  billing: IconCreditCard,
  creditCard: IconCreditCard,
  product: IconBox,
  pro: IconCrown,
  exclusive: IconStar,
  sparkles: IconSparkles,
  badgeCheck: IconRosetteDiscountCheck,
  lock: IconLock,

  // Data / Charts
  trendingDown: IconTrendingDown,
  trendingUp: IconTrendingUp,
  eyeOff: IconEyeOff,
  adjustments: IconAdjustmentsHorizontal,

  // Text formatting
  bold: IconBold,
  italic: IconItalic,
  underline: IconUnderline,
  text: IconTypography,

  // Toast
  toastSuccess: IconCircleCheck,
  toastInfo: IconInfoCircle,
  toastWarning: IconAlertTriangle,
  toastError: IconCircleX,
  toastLoading: IconLoader2,

  // Healthcare
  heartbeat: IconLumenLogo,
  stethoscope: IconStethoscope,
  pill: IconPill,
  reportMedical: IconReportMedical,
  calendarHeart: IconCalendarHeart,
  activity: IconActivity,
  visit: IconCalendarHeart,
  patientPortal: IconReportMedical,

  // Misc
  pizza: IconPizza,
  workspace: IconFolder,
  forms: IconClipboardText,
  slash: IconSlash,
  calendar: IconCalendar,
  galleryVerticalEnd: IconStack2,
  moreHorizontal: IconDots
};
