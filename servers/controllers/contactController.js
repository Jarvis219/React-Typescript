import Contact from "../model/contactModel";
import _ from "lodash";
export const listContact = (req, res) => {
  // eslint-disable-next-line array-callback-return
  Contact.find((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Contact does not exit",
      });
    }
    res.json({ data, message: "Send contact successfully"});
  });
};
export const createContact = (req, res) => {
  const contact = new Contact(req.body);
  contact.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "send contact failure",
      });
    }
    res.json(data);
  });
};
export const contactID = (req, res, next, id) => {
  Contact.findById(id).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: "Contact does not exit",
      });
    }
    req.contact = data;
    next();
  });
};
export const readContact = (req, res) => {
  return res.json(req.contact);
};

export const removeContact = (req, res) => {
  let contact = req.contact;
  contact.remove((err, deleteContact) => {
    if (err || !contact) {
      return res.status(400).json({
        error: "Delete contact failure",
      });
    }
    res.json({
      message: "Contact deleted successfully",
    });
  });
};

export const updateContact = (req, res) => {
  let contact = req.contact;
  contact = _.assignIn(contact, req.body);
  contact.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Update contact failure",
      });
    }
    res.json({ data, message: "Contact update successfully" });
  });
};
