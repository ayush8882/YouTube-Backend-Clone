const paginatedResults = async (
  req,
  res,
  next,
  model,
  populates,
  status = "",
  or = [],
) => {
  if (status) {
    req.query.status = status;
  }
  const reqQuery = { ...req.query };
  // remove below fields from the query string
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((param) => {
    delete reqQuery[param];
  });
  // stringify the reqQuery
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`,
  );
  query = model.find(JSON.parse(queryStr));

  if (or) {
    query = query.or(or);
  }

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort({ createdAt: -1 });
  }
  // work on pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  if (parseInt(req.query.limit) !== 0)
    query = query.skip(startIndex).limit(limit);

  // populate the fields
  if (populates) {
    populates.forEach((populate) => {
      query = query.populate(populate);
    });
  }
  const data = await query;
  let pagination = {};
  const count = await model.countDocuments(query);

  if (endIndex < count) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  if (parseInt(req.query.limit) !== 0) {
    res.advanceResults = {
      pagination,
      count: data.length,
      data,
      totalPages: Math.ceil(count / limit),
    };
  } else {
    res.advanceResults = {
      data,
    };
  }
  next();
};

module.exports = paginatedResults;
