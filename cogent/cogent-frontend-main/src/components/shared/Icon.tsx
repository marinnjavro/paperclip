import Account from '@/assets/icons/account.svg'
import ActionCheckMark from '@/assets/icons/action-checkmark.svg'
import ActionCrossMark from '@/assets/icons/action-crossmark.svg'
import ActiveCog from '@/assets/icons/active-cog.svg'
import ActionNew from '@/assets/icons/action-new.svg'
import AddCircle from '@/assets/icons/add-circle.svg'
import AddSquare from '@/assets/icons/add-square.svg'
import Add from '@/assets/icons/add.svg'
import AddItem from '@/assets/icons/add-item.svg'
import AddVideo from '@/assets/icons/add-video.svg'
import AddAudio from '@/assets/icons/add-audio.svg'
import AllBlocks from '@/assets/icons/all-blocks.svg'
import Arrows from '@/assets/icons/arrows.svg'
import ArrowsRight from '@/assets/icons/arrows-right.svg'
import ArrowsLeft from '@/assets/icons/arrows-left.svg'
import ArrowsMoveRight from '@/assets/icons/arrows-move-right.svg'
import ArrowsDown from '@/assets/icons/arrows-down.svg'
import Bookmark from '@/assets/icons/bookmark.svg'
import BurgerMenu from '@/assets/icons/burger-menu.svg'
import ClosingCard from '@/assets/icons/closing-card.svg'
import CheckMark from '@/assets/icons/checkmark.svg'
import ChevronDown from '@/assets/icons/chevron-down.svg'
import ChevronLeft from '@/assets/icons/chevron-left.svg'
import ChevronRight from '@/assets/icons/chevron-right.svg'
import Choose from '@/assets/icons/choose.svg'
import Cog from '@/assets/icons/cog.svg'
import Community from '@/assets/icons/community.svg'
import Dashboard from '@/assets/icons/dashboard.svg'
import DataPrivacy from '@/assets/icons/data-privacy.svg'
import Delete from '@/assets/icons/delete.svg'
import Download from '@/assets/icons/download.svg'
import Duplicate from '@/assets/icons/duplicate.svg'
import Edit from '@/assets/icons/edit.svg'
import EditWrite from '@/assets/icons/edit-write.svg'
import Email from '@/assets/icons/email.svg'
import Error from '@/public/assets/icons/error.svg'
import ExternalLink from '@/assets/icons/external-link.svg'
import Filter from '@/assets/icons/filter.svg'
import Filters from '@/assets/icons/filters.svg'
import HallOfFame from '@/assets/icons/hall-of-fame.svg'
import HamburgerMenu from '@/assets/icons/hamburger-menu.svg'
import Heart from '@/assets/icons/heart.svg'
import HeartFull from '@/assets/icons/heart-full.svg'
import HelpCircle from '@/assets/icons/help-circle.svg'
import Home from '@/assets/icons/home.svg'
import HomePage from '@/assets/icons/home-page.svg'
import Image from '@/assets/icons/image.svg'
import Info from '@/assets/icons/info.svg'
import InterfaceArrows from '@/assets/icons/interface-arrows.svg'
import Library from '@/assets/icons/library.svg'
import Link from '@/assets/icons/link.svg'
import Logout from '@/assets/icons/logout.svg'
import LogoutLeft from '@/assets/icons/logout-left.svg'
import More from '@/assets/icons/more.svg'
import Move from '@/assets/icons/move.svg'
import MultipleFiles from '@/assets/icons/multiple-files.svg'
import MyCogs from '@/assets/icons/my-cogs.svg'
import NewBlock from '@/assets/icons/new-block.svg'
import Notification from '@/assets/icons/notification.svg'
import PauseButton from '@/assets/icons/pause-button.svg'
import PaginationControlsRight from '@/assets/icons/pagination-controls-right.svg'
import PaginationControlsLeft from '@/assets/icons/pagination-controls-left.svg'
import PaginationMenu from '@/assets/icons/pagination-menu.svg'
import Pin from '@/assets/icons/pin.svg'
import Photo from '@/assets/icons/photo.svg'
import Play from '@/assets/icons/play.svg'
import PlayButton from '@/assets/icons/play-button.svg'
import Plus from '@/assets/icons/plus.svg'
import Profile from '@/assets/icons/profile.svg'
import ProfileCircle from '@/assets/icons/profile-circle.svg'
import ProfileUpload from '@/assets/icons/profile-upload.svg'
import Remove from '@/assets/icons/remove.svg'
import Save from '@/assets/icons/save.svg'
import Search from '@/assets/icons/search.svg'
import Security from '@/assets/icons/security.svg'
import Settings from '@/assets/icons/settings.svg'
import SettingsMenu from '@/assets/icons/settings-menu.svg'
import Stars from '@/assets/icons/stars.svg'
import Share from '@/assets/icons/share.svg'
import SoundOn from '@/assets/icons/sound-on.svg'
import SoundOff from '@/assets/icons/sound-on.svg'
import SquareLink from '@/assets/icons/square-link.svg'
import ThreeDots from '@/assets/icons/three-dots.svg'
import User from '@/assets/icons/user.svg'
import ZoomIn from '@/assets/icons/zoom-in.svg'

const iconTypes: { [type: string]: React.FC } = {
  account: Account,
  actionCheckMark: ActionCheckMark,
  actionCrossMark: ActionCrossMark,
  activeCog: ActiveCog,
  actionNew: ActionNew,
  addCircle: AddCircle,
  addSquare: AddSquare,
  add: Add,
  addItem: AddItem,
  addVideo: AddVideo,
  addAudio: AddAudio,
  allBlocks: AllBlocks,
  arrows: Arrows,
  arrowsRight: ArrowsRight,
  arrowsLeft: ArrowsLeft,
  arrowsMoveRight: ArrowsMoveRight,
  arrowsDown: ArrowsDown,
  bookmark: Bookmark,
  burgerMenu: BurgerMenu,
  closingCard: ClosingCard,
  checkMark: CheckMark,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  choose: Choose,
  cog: Cog,
  community: Community,
  dashboard: Dashboard,
  dataPrivacy: DataPrivacy,
  delete: Delete,
  download: Download,
  duplicate: Duplicate,
  edit: Edit,
  editWrite: EditWrite,
  email: Email,
  error: Error,
  externalLink: ExternalLink,
  filter: Filter,
  filters: Filters,
  stars: Stars,
  hallOfFame: HallOfFame,
  hamburgerMenu: HamburgerMenu,
  heart: Heart,
  heartFull: HeartFull,
  helpCircle: HelpCircle,
  home: Home,
  homePage: HomePage,
  image: Image,
  info: Info,
  interfaceArrows: InterfaceArrows,
  library: Library,
  link: Link,
  logout: Logout,
  logoutLeft: LogoutLeft,
  more: More,
  move: Move,
  multipleFiles: MultipleFiles,
  myCogs: MyCogs,
  newBlock: NewBlock,
  notification: Notification,
  paginationControlsRight: PaginationControlsRight,
  paginationControlsLeft: PaginationControlsLeft,
  paginationMenu: PaginationMenu,
  pauseButton: PauseButton,
  pin: Pin,
  photo: Photo,
  play: Play,
  playButton: PlayButton,
  plus: Plus,
  profile: Profile,
  profileCircle: ProfileCircle,
  profileUpload: ProfileUpload,
  remove: Remove,
  save: Save,
  search: Search,
  security: Security,
  settings: Settings,
  settingsMenu: SettingsMenu,
  share: Share,
  soundOn: SoundOn,
  soundOff: SoundOff,
  squareLink: SquareLink,
  threeDots: ThreeDots,
  user: User,
  zoomIn: ZoomIn
}

type IconProps = {
  type: string
  width?: number
  height?: number
  isActive?: boolean
  classNames?: string
  [x: string]: any
}

const Icon = ({
  type,
  width = 24,
  height = 24,
  isActive = false,
  classNames,
  ...props
}: IconProps): JSX.Element => {
  let Icon: any = iconTypes[type]
  return (
    <div className={`${classNames ? classNames : ''}`}>
      <Icon width={width} height={height} {...props} />
    </div>
  )
}

export default Icon
