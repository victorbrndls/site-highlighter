package com.harystolho.sitehighlighter.dao;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.Cookie;

import com.harystolho.sitehighlighter.model.Document;
import com.harystolho.sitehighlighter.model.Highlight;
import com.harystolho.sitehighlighter.utils.DocumentStatus;

public interface DocumentDAO {

	/**
	 * Adds the highlight to a document that has the same path
	 * @param highlight
	 */
	void addHighlightToDocument(Highlight highlight);

	/**
	 * Adds the highlight to the document that has the same id
	 * @param docId
	 * @param highlight
	 */
	void addHighlightToDocument(int docId, Highlight highlight);

	Document getHighlightsByPath(String path);

	List<Document> getDocumentsByUser(List<Cookie> cookies); // TODO remove cookie list from DAO

	Optional<Document> getDocumentById(List<Cookie> cookies, int id);

	void updateDocumentText(int id, String text);

	void setDocumentStatus(int id, DocumentStatus status);

	List<Document> getDocumentsByStatus(DocumentStatus status);

}
