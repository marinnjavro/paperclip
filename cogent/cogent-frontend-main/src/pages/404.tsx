import { useRouter } from 'next/router'
import ButtonSecondary from '@/components/shared/ButtonSecondary'
import ButtonPrimary from '@/components/shared/ButtonPrimary'

export default function Custom404() {
  const router = useRouter()

  return (
    <section>
      <div className="container mx-auto flex min-h-screen items-center px-6 py-12">
        <div>
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            We can’t find that page
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {
              "Sorry, the page you are looking for doesn't exist or has been moved."
            }
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <ButtonSecondary
              label="Go back"
              icon="arrowsLeft"
              iconPosition="left"
              onClick={() => router.back()}
            />

            <ButtonPrimary
              label="Take me home"
              size="small"
              onClick={() => router.push('/community')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
