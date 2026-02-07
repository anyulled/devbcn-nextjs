import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import FaqContent from "@/components/sections/faq/FaqContent";

export default function Faq() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeader title="Frequently Asked Question" breadcrumbText="Frequently Asked Question" backgroundImageId={15} contentColClass="col-lg-9" />
        <FaqContent />
      </div>
    </Layout>
  );
}
