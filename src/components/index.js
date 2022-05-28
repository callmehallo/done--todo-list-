import DropdownIcon from './Dropdown/DropdownIcon'
import DropdownMenu from './Dropdown/DropdownMenu'
import Form from './Form'
import Section from './Section'
import AppBar from './AppBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SectionProvider, useSections } from './SectionsContext'
import { section, reducer, getInitialValue, ACTIONS } from './utils/reducer'
import AddSectionModal from './AddSectionModal'

export {
  DropdownIcon,
  DropdownMenu,
  Form,
  Section,
  AppBar,
  FontAwesomeIcon,
  SectionProvider,
  useSections,
  ACTIONS,
  section,
  AddSectionModal,
  reducer,
  getInitialValue,
}
