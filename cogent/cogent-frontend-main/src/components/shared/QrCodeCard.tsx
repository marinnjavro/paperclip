import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const QRCodeStylingNoSSRWrapper = dynamic(
  import('@/components/shared/QrCode'),
  {
    ssr: false
  }
)

interface QrCodeCardProps {
  title: string
}

const QrCodeCard: React.FC<QrCodeCardProps> = ({ title }) => {
  const { asPath } = useRouter()

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}/`

  return (
    <div className="card mb-14 w-full max-w-[20rem] xs:min-w-[333px]">
      <div className="aspect-ratio--wrapper--9-16">
        <div className="aspect-ratio--content">
          <div
            className="leading-2 h-full w-full overflow-hidden
          rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-[#E3E7EB] bg-center bg-no-repeat p-4 text-center font-bold text-white line-clamp-4 dark:border-white dark:border-opacity-10 dark:bg-night-base-03"
          >
            <div className="flex flex-col items-center">
              <QRCodeStylingNoSSRWrapper url={url} />
              <div className="mt-4 text-base">{title}</div>
            </div>
          </div>

          <div className="absolute -mt-[1.5px] flex w-full">
            <div className="w-1/5"> </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QrCodeCard

const styles = {
  inputWrapper: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20
  }
}
