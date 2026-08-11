import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '../components/PageLayout';
import { ROUTES } from '../routes';

export default function NotFoundPage() {
  const { t } = useTranslation('common');

  return (
    <PageLayout>
      <div className="py-24 text-center space-y-6 px-4">
        <div className="font-serif-display text-6xl font-light text-[#0A1F44]">404</div>
        <p className="text-sm text-[#0A1F44]/70 font-sans-body">
          {t('notFound.message', { defaultValue: "The page you're looking for doesn't exist." })}
        </p>
        <Link
          to={ROUTES.HOME}
          className="inline-block py-2.5 px-5 bg-[#0A1F44] text-[#F8F6F0] font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-[#06152E] transition-colors"
        >
          {t('notFound.backHome', { defaultValue: 'Back to Home' })}
        </Link>
      </div>
    </PageLayout>
  );
}
