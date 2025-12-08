export default function PrivacyPolicyPage() {
  const pageData = {
    status: 200,
    data: {
      id: 10,
      layout: null,
      content: null,
      url_key: 'privacy-policy',
      html_content: 'Privacy Policy Page Content',
      meta_description: '',
      meta_title: 'Privacy Policy',
      page_title: 'Privacy Policy',
      meta_keywords: 'privacy, policy',
      created_at: '2025-10-19T03:28:19.000000Z',
      updated_at: '2025-10-19T03:28:19.000000Z',
    },
  };

  const { page_title, html_content } = pageData.data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">{page_title}</h1>

      {/* Content */}
      <div className="bg-white shadow-md border border-gray-200 rounded-xl p-8 leading-relaxed">
        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: html_content }}
        />
      </div>
    </div>
  );
}
