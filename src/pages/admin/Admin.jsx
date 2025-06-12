import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

export default function AdminPage() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [sections, setSections] = useState([]);

  const [newPageSlug, setNewPageSlug] = useState("");
  const [newPageDescription, setNewPageDescription] = useState("");

  const [newSectionKey, setNewSectionKey] = useState("");
  const [newSectionTable, setNewSectionTable] = useState("");
  const [newSectionBucket, setNewSectionBucket] = useState("");

  // Fetch all pages
  const loadPages = async () => {
    const { data, error } = await supabase.from("site_pages").select("*");
    if (!error) setPages(data);
  };

  // Fetch sections for a selected page
  const loadSections = async (pageId) => {
    const { data, error } = await supabase
      .from("page_sections")
      .select("*")
      .eq("page_id", pageId);
    if (!error) setSections(data);
  };

  // Add a new page
  const addPage = async () => {
    if (!newPageSlug) return;
    await supabase
      .from("site_pages")
      .insert([{ slug: newPageSlug, description: newPageDescription }]);
    setNewPageSlug("");
    setNewPageDescription("");
    loadPages();
  };

  // Add a new section
  const addSection = async () => {
    if (!selectedPage || !newSectionKey || !newSectionTable) return;
    await supabase.from("page_sections").insert([
      {
        page_id: selectedPage.id,
        section_key: newSectionKey,
        data_table: newSectionTable,
        data_bucket: newSectionBucket || null,
      },
    ]);
    setNewSectionKey("");
    setNewSectionTable("");
    setNewSectionBucket("");
    loadSections(selectedPage.id);
  };

  // Load pages on first render
  useEffect(() => {
    loadPages();
  }, []);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      {/* Page Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Manage Pages</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Page slug (e.g., home)"
            value={newPageSlug}
            onChange={(e) => setNewPageSlug(e.target.value)}
            className="border p-2 flex-1 rounded"
          />
          <input
            type="text"
            placeholder="Page description"
            value={newPageDescription}
            onChange={(e) => setNewPageDescription(e.target.value)}
            className="border p-2 flex-1 rounded"
          />
          <button
            onClick={addPage}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Page
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => {
                setSelectedPage(page);
                loadSections(page.id);
              }}
              className={`px-4 py-2 rounded ${
                selectedPage?.id === page.id
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200"
              }`}
            >
              {page.slug}
            </button>
          ))}
        </div>
      </div>

      {/* Section Management */}
      {selectedPage && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Sections for: {selectedPage.slug}
          </h2>

          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Section key (e.g., hero_section)"
              value={newSectionKey}
              onChange={(e) => setNewSectionKey(e.target.value)}
              className="border p-2 flex-1 rounded"
            />
            <input
              type="text"
              placeholder="Data table (e.g., home_hero_content)"
              value={newSectionTable}
              onChange={(e) => setNewSectionTable(e.target.value)}
              className="border p-2 flex-1 rounded"
            />
            <input
              type="text"
              placeholder="Data bucket (optional)"
              value={newSectionBucket}
              onChange={(e) => setNewSectionBucket(e.target.value)}
              className="border p-2 flex-1 rounded"
            />
            <button
              onClick={addSection}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Section
            </button>
          </div>

          <ul className="space-y-2">
            {sections.map((section) => (
              <li
                key={section.id}
                className="border rounded p-2 flex justify-between items-center"
              >
                <div>
                  <strong>{section.section_key}</strong> → {section.data_table}{" "}
                  {section.data_bucket && `(Bucket: ${section.data_bucket})`}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
