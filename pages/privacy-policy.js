import { Page } from '@components/layout';

export default function TermsConditions({ pressItems }) {
  const title = `Privacy Policy`;
  return (
    <Page title={title} description="Terms and Conditions" headerClass="header-default">
      <section className="container">
        <div className="content content-no-hero">
          <h1>{title}</h1>
          <section></section>
        </div>
      </section>
    </Page>
  );
}
