import { LuTelescope } from 'react-icons/lu'

export function ComingSoon() {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <LuTelescope size={72} />
        <h1 className='text-4xl leading-tight font-bold'>Coming Soon!</h1>
        <p className='text-muted-foreground text-center'>
          This page has not been created yet. <br />
          Stay tuned though!
        </p>
      </div>
    </div>
  )
}
