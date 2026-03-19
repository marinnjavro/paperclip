import Checkbox from '@/components/shared/Checkbox'
import Icon from '@/components/shared/Icon'

const NotificationSettings = () => {
  return (
    <div className="rounded-4xl bg-day-base-02 p-6 dark:bg-night-base-02">
      <h2 className="text-xl font-bold text-day-text-label-primary dark:text-white">
        Notification settings
      </h2>

      <div className="mt-5 flex flex-col gap-3.5">
        <Checkbox
          name="cogent-updates"
          label="I want to receive information on how my students are doing"
          isChecked={false}
          isDisabled={true}
          handleCheck={() => {}}
        />
        <Checkbox
          name="published-updates"
          label="I want to know how my cogs are performing"
          isChecked={false}
          isDisabled={true}
          handleCheck={() => {}}
        />
        <Checkbox
          name="installation"
          label="I want to receive news and updates from cogent"
          isChecked={false}
          isDisabled={true}
          handleCheck={() => {}}
        />
      </div>

      <h3 className="mt-5 text-base font-bold text-day-text-label-primary dark:text-white">
        Deleting or deactivating a profile
      </h3>

      <div className="mt-5 flex flex-col gap-3 text-sm font-bold xxs:flex-row xs:gap-8">
        <div className="flex items-center gap-1 text-night-text-label-secondary dark:text-white dark:opacity-60">
          <span>Delete profile</span>
          <Icon type="delete" width={16} height={16} />
        </div>
        <div className="flex items-center gap-1 text-night-text-label-secondary dark:text-white dark:opacity-60">
          <span>Deactivate profile</span>
          <Icon type="logoutLeft" width={16} height={16} />
        </div>
      </div>
    </div>
  )
}

export default NotificationSettings
